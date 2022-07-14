import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import AddUser from "components/card/AddUser";
import UsersTable from "components/table/Users";
import SearchUser from "components/search/User";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { allUsers, getOutlet, checkUid, getTotalAdmin } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import { useRouter } from "next/router";
import fetchJson, { FetchError } from "lib/fetchJson";

// ssr
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

  if (checkUids.length < 1) {
    return redirect("/");
  }

  const users = await allUsers(
    query.start ? parseInt(query.start) : 0,
    query.length ? parseInt(query.length) : 10
  );
  const listOutlet = await getOutlet();
  const totalUser = await getTotalAdmin();

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    users: users,
    listOutlet: listOutlet,
    totalAdmin: totalUser[0].total,
  });
},
sessionOptions);

const ManageUsers = (props) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const router = useRouter();
  const dataUser = props.users;
  const [dataSearch, setDataSearch] = useState([]);
  const [totalRows, setTotalRows] = useState(props.totalAdmin);
  const [perPage, setPerPage] = useState(10);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    globalAct.setListOutlet(props.listOutlet);
    globalAct.setFullname(props.fullName);
    globalAct.setAdminMode("ski");
  }, []);

  return (
    <div className="w-full p-3 flex flex-col gap-y-3">
      <div>
        {useMemo(() => {
          console.log("adduser");
          return <AddUser globalAct={globalAct} globalCtx={globalCtx} />;
        }, [])}
      </div>
      <div>
        {useMemo(() => {
          console.log("searchuser");
          return (
            <SearchUser
              setData={setDataSearch}
              setTotalRows={setTotalRows}
              setIsSearch={setIsSearch}
            />
          );
        }, [])}
      </div>
      <div>
        {useMemo(() => {
          console.log("tabel");
          return (
            <UsersTable
              data={isSearch ? dataSearch : dataUser}
              search={isSearch}
              totalRows={totalRows}
              handlePageChange={(page) => {
                router.replace(
                  `/dashboardSKI/admins?start=${
                    (page - 1) * perPage
                  }&length=${perPage}`
                );
              }}
            />
          );
        }, [dataUser, isSearch])}
      </div>
    </div>
  );
};

export default ManageUsers;
ManageUsers.getLayout = getLayout;
