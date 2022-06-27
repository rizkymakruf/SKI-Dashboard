import { useContext, useEffect } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import AddUser from "components/card/AddUser";
import UsersTable from "components/table/Users";
import SearchUser from "components/search/User";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { allUsers, checkUid } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import { useRouter } from "next/router";

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

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    allUsers: users,
  });
},
sessionOptions);

const ManageUsers = (props) => {
  // console.log(props.access_token);
  const router = useRouter();
  // console.log(props);
  {
    /* Default */
  }
  const { globalCtx, globalAct } = useContext(GlobalContext);
  useEffect(() => {
    globalAct.setIsFetch(false);
    globalAct.setErrorMsg("");
  }, []);

  return (
    <div className="w-full p-3 flex flex-col gap-y-3">
      {props.allUsers.map((dat, idx) => {
        return (
          <div className="w-full">
            <AddUser globalAct={globalAct} globalCtx={globalCtx} users={dat} />
          </div>
        );
      })}
      {/* <div>
        <AddUser globalAct={globalAct} globalCtx={globalCtx} />
      </div> */}
      <div>
        <SearchUser globalAct={globalAct} globalCtx={globalCtx} />
      </div>
      <div>
        <UsersTable globalAct={globalAct} globalCtx={globalCtx} />
      </div>
    </div>
  );
};

export default ManageUsers;
ManageUsers.getLayout = getLayout;
