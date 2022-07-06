import { useContext, useEffect, useState } from "react";
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

  const category = await mainCategory();
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
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const [data, setData] = useState(props.category);
  const [totalRows, setTotalRows] = useState(props.totalCat);
  const [perPage, setPerPage] = useState(10);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
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
  };

  return (
    <div className="w-full p-3 flex flex-col gap-y-2">
      <div>
        <FormCategory
        // globalAct={globalAct}
        // globalCtx={globalCtx}
        // onSubmit={async function handleSubmit(e) {
        //   e.preventDefault();
        //   globalAct.setIsFetch(true);

        //   const body = {
        //     name: e.currentTarget.category.value,
        //     uri: "category/add",
        //   };

        //   console.log("ni", body);

        //   try {
        //     const aa = await fetchJson("/api/prot/post", {
        //       method: "POST",
        //       headers: { "Content-Type": "application/json" },
        //       body: JSON.stringify(body),
        //     });
        //     await router.reload(router.pathname);
        //   } catch (error) {
        //     if (error instanceof FetchError) {
        //       globalAct.setErrorMsg(error.data.message);
        //     } else {
        //       console.log(error);
        //       globalAct.setErrorMsg("An unexpected error happened");
        //     }
        //   }
        //   globalAct.setIsFetch(false);
        // }}
        />
      </div>
      <div>
        <SearchCategory
          setData={setData}
          setTotalRows={setTotalRows}
          setIsSearch={setIsSearch}
        />
      </div>
      <div>
        <CategoryTable
          data={data}
          search={isSearch}
          totalRows={totalRows}
          handlePageChange={handlePageChange}
          handlePerRowsChange={handlePerRowsChange}
        />
      </div>
    </div>
  );
};

export default ManageCategory;
ManageCategory.getLayout = getLayout;
