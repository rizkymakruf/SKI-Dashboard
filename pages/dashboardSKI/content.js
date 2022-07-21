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

  const uid = JSON.parse(atob(user.access_token.split(".")[1]));
  const checkUids = await checkUid(uid.user_id);

  // naaaaa
  if (checkUids[0].outlet !== "") {
    return redirect("/");
  }

  const content = await getContent();
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
  const [data, setData] = useState(props.content);
  const [totalRows, setTotalRows] = useState(props.totalCat);
  const [perPage, setPerPage] = useState(10);

  const { modal } = globalCtx;

  useEffect(() => {
    globalAct.setFullname(props.fullName);
    globalAct.setUserPict(props.pict);
    globalAct.setOutletPict(props.outletPict);
    globalAct.setAdminMode("ski");
  }, []);

  const handlePageChange = useCallback((page) => {
    fetchData((page - 1) * perPage, perPage);
  }, []);

  const handlePerRowsChange = useCallback((newPerPage, page) => {
    setPerPage(newPerPage);
    fetchData(0, newPerPage);
  }, []);

  const fetchData = useCallback(async (start, page) => {
    globalAct.setIsFetch(true);
    const body = {
      uri: "content",
      start: start,
      length: page,
    };
    try {
      const res = await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setData(res.data);
      setTotalRows(res.total);
      setPerPage(page);
    } catch (error) {
      console.log("error", error);
      if (error instanceof FetchError) {
        globalAct.setErrorMsg(error.data.message);
      } else {
        globalAct.setErrorMsg("An unexpected error happened");
      }
    }
    globalAct.setIsFetch(false);
  }, []);

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
              handlePageChange={handlePageChange}
              handlePerRowsChange={handlePerRowsChange}
            />
          );
        }, [data])}
      </div>
    </div>
  );
};

export default ManageContent;
ManageContent.getLayout = getLayout;
