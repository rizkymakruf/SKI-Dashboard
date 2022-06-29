import { useContext, useEffect, useState } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";
import AddContent from "components/card/AddContent";
import ContentTable from "components/table/Content";

import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { getContent, checkUid } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  query,
}) {
  var user = await req.session.user;
  if (!user || !user.access_token) {
    return retObject({ isLogin: false });
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

  const content = await getContent();

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    // access_token: user.access_token,
    fullName: checkUids[0].fullname,
    content: content,
  });
},
sessionOptions);

const ManageContent = (props) => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const [data, setData] = useState(props.content);

  // console.log(props.category);

  useEffect(() => {
    globalAct.setSelectedData(props.content);
  }, []);
  return (
    <div className="w-full p-3 flex flex-col gap-y-2">
      <div>
        <AddContent globalAct={globalAct} globalCtx={globalCtx} />
      </div>
      <div>
        <ContentTable
          globalAct={globalAct}
          globalCtx={globalCtx}
          content={data}
        />
      </div>
    </div>
  );
};

export default ManageContent;
ManageContent.getLayout = getLayout;
