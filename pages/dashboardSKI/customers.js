import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";
import UsersTable from "components/table/Users";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { allCst, checkUid, getTotalCust } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import { useRouter } from "next/router";
import SearchUserCst from "components/search/UserCst";
import UsersTableCst from "components/table/UsersCst";
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
  if (checkUids[0].outlet !== "") {
    return redirect("/");
  }

  const cst = await allCst(
    query.start ? parseInt(query.start) : 0,
    query.length ? parseInt(query.length) : 10
  );
  const totalCust = await getTotalCust();

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    pict:
      checkUids[0].pict !== "" ? checkUids[0].pict : "/img/user-default.png",
    outletPict: "/img/ski.png",
    cst: cst,
    totalCust: totalCust[0].total,
  });
},
sessionOptions);

const ManageUsersCst = (props) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const data = props.cst;
  const router = useRouter();
  const [totalRows, setTotalRows] = useState(props.totalCust);
  const [perPage, setPerPage] = useState(10);
  const [isSearch, setIsSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState([]);

  useEffect(() => {
    globalAct.setFullname(props.fullName);
    globalAct.setUserPict(props.pict);
    globalAct.setOutletPict(props.outletPict);
    globalAct.setAdminMode("ski");
  }, []);

  return (
    <div className="w-full p-3 flex flex-col gap-y-3">
      <div>
        {useMemo(() => {
          console.log("search");
          return (
            <SearchUserCst
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
            <UsersTableCst
              data={data}
              search={isSearch}
              totalRows={totalRows}
              handlePageChange={(page) => {
                router.replace(
                  `/dashboardSKI/customers?start=${
                    (page - 1) * perPage
                  }&length=${perPage}`
                );
              }}
              handlePerRowsChange={(newpage) => {
                setPerPage(newpage);
                router.replace(
                  `/dashboardSKI/customers?start=0&length=${newpage}`
                );
              }}
            />
          );
        }, [data, isSearch])}
      </div>
    </div>
  );
};

export default ManageUsersCst;
ManageUsersCst.getLayout = getLayout;
