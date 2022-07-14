import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import FormCategory from "components/form/FormCategory";
import SearchCategory from "components/search/Category";
import CategoryTable from "components/table/Category";

import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { mainCategory, checkUid, getTotalCategory } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";

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

  const category = await mainCategory(
    query.start ? parseInt(query.start) : 0,
    query.length ? parseInt(query.length) : 10
  );
  const totalCat = await getTotalCategory();

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    category: category,
    totalCat: totalCat[0].total,
  });
},
sessionOptions);

const ManageCategory = (props) => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();
  const data = props.category;
  const [dataSearch, setDataSearch] = useState([]);
  const [totalRows, setTotalRows] = useState(props.totalCat);
  const [perPage, setPerPage] = useState(10);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    globalAct.setFullname(props.fullName);
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
    console.log("perpage", perPage);
    const body = {
      uri: "category",
      start: start,
      length: page,
    };
    try {
      const res = await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(res);
      setData(res.data);
      setTotalRows(res.total);
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
          console.log("form");
          return <FormCategory />;
        }, [])}
      </div>
      <div>
        {useMemo(() => {
          console.log("search");
          return (
            <SearchCategory
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
            <CategoryTable
              data={isSearch ? dataSearch : data}
              search={isSearch}
              totalRows={totalRows}
              handlePageChange={(page) => {
                router.replace(
                  `/dashboardSKI/category?start=${
                    (page - 1) * perPage
                  }&length=${perPage}`
                );
              }}
            />
          );
        }, [data, isSearch])}
      </div>
    </div>
  );
};

export default ManageCategory;
ManageCategory.getLayout = getLayout;
