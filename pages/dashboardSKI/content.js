import {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  memo,
  useRef,
} from "react";
import { getLayout } from "components/layout/Navbar";
import { useForm } from "react-hook-form";
import { GlobalContext } from "context/global";
import AddContent from "components/card/AddContent";
import ContentTable from "components/table/Content";
import ContentUpdateModal from "components/modal/ContentUpdate";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import { getContent, checkUid, getTotalContent } from "lib/arangoDb";

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  query,
}) {
  var user = await req.session.user;
  if (!user || !user.access_token) {
    // retObject({ isLogin: false });
    return redirect("/");
  }

  const validationToken = await checkerToken(user);
  if (validationToken.error) {
    await req.session.destroy();
    return redirect("/");
  }

  if (validationToken.status === "refresh") {
    user = {
      isLoggedIn: true,
      access_token: validationToken.access_token,
      refresh_token: validationToken.refresh_token,
    };
    req.session.user = user;
    await req.session.save();
  }

  global.atob = require("atob");

  const uid = JSON.parse(atob(user.access_token.split(".")[1]));
  const checkUids = await checkUid(uid.user_id);

  // naaaaa
  if (checkUids[0].outlet !== "") {
    return redirect("/");
  }

  const content = await getContent(
    query.start ? parseInt(query.start) : 0,
    query.length ? parseInt(query.length) : 10
  );
  const totalContent = await getTotalContent();

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    pict:
      checkUids[0].pict !== "" ? checkUids[0].pict : "/img/user-default.png",
    outletPict: "/img/ski.png",

    content: content,
    totalContent: totalContent,
  });
},
sessionOptions);

const ManageContent = (props) => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();
  const data = props.content;
  const [totalRows, setTotalRows] = useState(props.totalCat);
  const [perPage, setPerPage] = useState(10);

  const { modal } = globalCtx;

  useEffect(() => {
    globalAct.setFullname(props.fullName);
    globalAct.setUserPict(props.pict);
    globalAct.setOutletPict(props.outletPict);
    globalAct.setAdminMode("ski");
  }, []);
  console.log(props.content);

  return (
    <div className="w-full p-3 flex flex-col gap-y-2">
      <div>
        {useMemo(() => {
          console.log("addContent");
          return <AddContent globalAct={globalAct} globalCtx={globalCtx} />;
        }, [])}
      </div>
      <div>
        {useMemo(() => {
          return (
            <ContentTable
              setMethod={props.setMethod}
              method={props.method}
              reset={props.reset}
              data={data}
              totalRows={totalRows}
              handlePageChange={(page) => {
                router.replace(
                  `/dashboardSKI/content?start=${
                    (page - 1) * perPage
                  }&length=${perPage}`
                );
              }}
              handlePerRowsChange={(newpage) => {
                setPerPage(newpage);
                router.replace(
                  `/dashboardSKI/content?start=0&length=${newpage}`
                );
              }}
            />
          );
        }, [data])}
      </div>
    </div>
  );
};

export default ManageContent;
ManageContent.getLayout = getLayout;
