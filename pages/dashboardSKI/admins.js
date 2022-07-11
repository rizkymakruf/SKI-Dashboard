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
  const [isSearch, setIsSearch] = useState(false);

  const onSetDataUser = useCallback(
    (x) => {
      setDataUser(x);
    },
    [dataUser]
  );

  const onSetTotalRows = useCallback(
    (x) => {
      setTotalRows(x);
    },
    [totalRows]
  );

  const onSetIsSearch = useCallback(
    (x) => {
      setIsSearch(x);
    },
    [isSearch]
  );

  const onSetPerPage = useCallback(
    (x) => {
      setPerPage(x);
    },
    [perPage]
  );

  useEffect(() => {
    globalAct.setListOutlet(props.listOutlet);
    globalAct.setFullname(props.fullName);
    globalAct.setAdminMode("ski");
  }, []);

  const handlePageChange = useCallback((page) => {
    fetchData((page - 1) * perPage, perPage);
  }, []);

  const handlePerRowsChange = useCallback((newPerPage, page) => {
    onSetPerPage(newPerPage);
    fetchData(0, newPerPage);
  }, []);

  const fetchData = useCallback(async (start, page) => {
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
      onSetDataUser(res.data);
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
              setData={onSetDataUser}
              setTotalRows={onSetTotalRows}
              setIsSearch={onSetIsSearch}
            />
          );
        }, [])}
      </div>
      <div>
        {useMemo(() => {
          console.log("tabel");
          return (
            <UsersTable
              data={dataUser}
              search={isSearch}
              totalRows={totalRows}
              handlePageChange={handlePageChange}
              handlePerRowsChange={handlePerRowsChange}
            />
          );
        }, [dataUser])}
      </div>
    </div>
  );
};

export default ManageUsers;
ManageUsers.getLayout = getLayout;
