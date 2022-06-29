import { useContext, useEffect, useState } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import AddUser from "components/card/AddUser";
import UsersTable from "components/table/Users";
import SearchUser from "components/search/User";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { allUsers, getOutlet, checkUid } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import { useRouter } from "next/router";

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

  const users = await allUsers();
  const listOutlet = await getOutlet();

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    users: users,
    listOutlet: listOutlet,
  });
},
sessionOptions);

const ManageUsers = (props) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const [data, setData] = useState(props.users);
  const router = useRouter();
  // console.log(props);
  useEffect(() => {
    globalAct.setListOutlet(props.listOutlet);
    globalAct.setSelectedData(props.users);
  }, []);

  return (
    <div className="w-full p-3 flex flex-col gap-y-3">
      <div>
        <AddUser globalAct={globalAct} globalCtx={globalCtx} />
      </div>
      <div>
        <SearchUser
          globalAct={globalAct}
          globalCtx={globalCtx}
          setData={setData}
        />
      </div>
      <div>
        <UsersTable globalAct={globalAct} globalCtx={globalCtx} users={data} />
      </div>
    </div>
  );
};

export default ManageUsers;
ManageUsers.getLayout = getLayout;
