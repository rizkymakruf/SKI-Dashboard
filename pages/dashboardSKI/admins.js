import { useContext, useEffect, useState } from "react";
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

  if (checkUids.length < 1) {
    return redirect("/");
  }

  const users = await allUsers();
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
  const [dataUser, setDataUser] = useState(props.users);
  const [totalRows, setTotalRows] = useState(props.totalAdmin);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    globalAct.setListOutlet(props.listOutlet);
    globalAct.setFullname(props.fullName);
    globalAct.setAdminMode("ski");
  }, []);

  const handlePageChange = (page) => {
    fetchData((page - 1) * perPage, perPage);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    fetchData(0, newPerPage);
  };

  const fetchData = async (start, page) => {
    globalAct.setIsFetch(true);
    const body = {
      uri: "user",
      start: start,
      length: page,
    };
    try {
      const res = await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setDataUser(res.data);
    } catch (error) {
      console.log("error", error);
      if (error instanceof FetchError) {
        globalAct.setErrorMsg(error.data.message);
      } else {
        globalAct.setErrorMsg("An unexpected error happened");
      }
    }
    globalAct.setIsFetch(false);
  };

  return (
    <div className="w-full p-3 flex flex-col gap-y-3">
      <div>
        <AddUser globalAct={globalAct} globalCtx={globalCtx} />
      </div>
      <div>
        <SearchUser setData={setDataUser} />
      </div>
      <div>
        <UsersTable
          data={dataUser}
          totalRows={totalRows}
          handlePageChange={handlePageChange}
          handlePerRowsChange={handlePerRowsChange}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
ManageUsers.getLayout = getLayout;
