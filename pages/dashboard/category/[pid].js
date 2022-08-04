import { GlobalContext } from "context/global";
import { getLayout } from "components/layout/Navbar";
import SubCategoryTable from "components/table/SubCategory";
import fetchJson, { FetchError } from "lib/fetchJson";
import SearchSubCategory from "components/search/SubCategory";
import { useRouter } from "next/router";
import { sessionOptions } from "lib/session";
import { useContext, useEffect, useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import {
  checkUid,
  findOutlet,
  getAllCategory,
  getAllSubCategory,
  getOutletByShortname,
  getTotalSubCategory,
} from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import FormSubCategory from "components/form/FormSubCategory";

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
  let outlet = [];
  if (checkUids[0].outlet !== "") {
    outlet = await findOutlet(checkUids[0]?.outlet);
    if (outlet[0].shortname !== query.pid) {
      return redirect("/");
    }
  }

  if (checkUids.length < 1) {
    return redirect("/");
  }

  const keyOutlet = await getOutletByShortname(query.pid);
  const mainCategory = await getAllCategory();
  const subCategory = await getAllSubCategory(
    keyOutlet[0].key,
    query.start ? parseInt(query.start) : 0,
    query.length ? parseInt(query.length) : 10
  );
  const totalSub = await getTotalSubCategory(keyOutlet[0].key);

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    adminMode: outlet.length > 0 ? outlet[0]?.shortname : query.pid,
    ski: checkUids[0].outlet !== "" ? false : true,
    outletPict: "/img/ski.png",
    mainCategory: mainCategory,
    subCategory: subCategory,
    totalSub: totalSub[0].total,
  });
},
sessionOptions);

const ManageCategory = (props) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const router = useRouter();

  const [dataSearch, setDataSearch] = useState([]);
  const [totalRows, setTotalRows] = useState(props.totalSub);
  const [perPage, setPerPage] = useState(10);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    globalAct.setAdminMode("outlet");
    globalAct.setFullname(props.fullName);
    globalAct.setIsFetch(false);
    globalAct.setErrorMsg("");
    globalAct.setSki(props.ski);
    globalAct.setCurrentBrand(props.adminMode);
    globalAct.setOutletPict(props.outletPict);
    globalAct.setListCategory(props.mainCategory);
  }, []);

  useEffect(() => {
    console.log("fetch data status : ", globalCtx.isFetch);
  }, [globalCtx]);

  return (
    <div className="w-full p-4 flex flex-col gap-y-4">
      <div>
        <FormSubCategory maincategory={props.mainCategory} />
      </div>
      <div>
        <SearchSubCategory setIsSearch={setIsSearch} setData={setDataSearch} />
      </div>
      <div>
        <SubCategoryTable
          cat={props.subCategory}
          search={isSearch}
          data={dataSearch}
          totalRows={totalRows}
          handlePageChange={(page) => {
            router.replace(
              `/dashboard/category/${props.adminMode}?start=${
                (page - 1) * perPage
              }&length=${perPage}`
            );
          }}
          handlePerRowsChange={(newpage) => {
            setPerPage(newpage);
            router.replace(
              `/dashboard/category/${props.adminMode}?start=0&length=${newpage}`
            );
          }}
        />
      </div>
    </div>
  );
};

export default ManageCategory;
ManageCategory.getLayout = getLayout;
