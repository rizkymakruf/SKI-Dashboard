import { useContext, useEffect, useState } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";
import UsersTable from "components/table/Users";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { allCst, checkUid } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import { useRouter } from "next/router";
import SearchUserCst from "components/search/UserCst";
import UsersTableCst from "components/table/UsersCst";

// ssr
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

  const cst = await allCst();

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    cst: cst,
  });
},
sessionOptions);

const ManageUsersCst = (props) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const [data, setData] = useState(props.cst);
  const router = useRouter();
  // console.log(props.cst);
  useEffect(() => {
    // globalAct.setSelectedData(props.cst);
  }, []);

  return (
    <div className="w-full p-3 flex flex-col gap-y-3">
      {/* <div>
        <AddUser globalAct={globalAct} globalCtx={globalCtx} />
      </div> */}
      <div>
        <SearchUserCst
          globalAct={globalAct}
          globalCtx={globalCtx}
          setData={setData}
        />
      </div>
      <div>
        <UsersTableCst globalAct={globalAct} globalCtx={globalCtx} cst={data} />
      </div>
    </div>
  );
};

export default ManageUsersCst;
ManageUsersCst.getLayout = getLayout;
