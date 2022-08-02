import { getLayout } from "components/layout/Navbar";
import ProductTable from "components/table/Product";
import AddCard from "components/card/AddProduct";
import SearchProductOutlet from "components/search/ProductOutlet";

import { useRouter } from "next/router";
import { sessionOptions } from "lib/session";
import { GlobalContext } from "context/global";
import { useContext, useEffect, useMemo, useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import {
  checkUid,
  getOutletProductList,
  getOutletByShortname,
  getTotalOutletProduct,
} from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import FormProduct from "components/form/FormProduct";
import AddProduct from "components/card/AddProduct";

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

  const keyOutlet = await getOutletByShortname(query.pid);
  const product = await getOutletProductList(
    keyOutlet[0].key,
    query.start ? parseInt(query.start) : 0,
    query.length ? parseInt(query.length) : 10
  );
  const totalProduct = await getTotalOutletProduct(keyOutlet[0].key);

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    adminMode: outlet.length > 0 ? outlet[0]?.shortname : query.pid,
    ski: checkUids[0].outlet !== "" ? false : true,
    outletPict: "/img/ski.png",
    product: product,
    totalProduct: totalProduct[0].total,
  });
},
sessionOptions);

const ManageProduct = (props) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const router = useRouter();
  const dataProduct = props.product;
  const [totalRows, setTotalRows] = useState(props.totalProduct);
  const [dataSearch, setDataSearch] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    globalAct.setAdminMode("outlet");
    globalAct.setFullname(props.fullName);
    globalAct.setIsFetch(false);
    globalAct.setErrorMsg("");
    globalAct.setSki(props.ski);
    globalAct.setCurrentBrand(props.adminMode);
    globalAct.setOutletPict(props.outletPict);
  }, []);

  useEffect(() => {
    console.log("product : ", props.product);
  }, [globalCtx]);
  return (
    <div className="w-full p-4 flex flex-col gap-y-4">
      <div className="w-full border border-gray-300 rounded-md p-4 shadow-sm hover:shadow-md hover:shadow-red-500">
        <AddProduct globalAct={globalAct} globalCtx={globalCtx} />
      </div>

      {/* <div>
        <ProductTable globalAct={globalAct} globalCtx={globalCtx} />
      </div> */}
      <div>
        {useMemo(() => {
          console.log("searchuser");
          return (
            <div className="w-full p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-md hover:shadow-red-500">
              <SearchProductOutlet
                setData={setDataSearch}
                setTotalRows={setTotalRows}
                setIsSearch={setIsSearch}
              />
            </div>
          );
        }, [])}
      </div>
      <div>
        {useMemo(() => {
          console.log("tabel");
          console.log(globalCtx.currentBrand);
          return (
            <ProductTable
              data={isSearch ? dataSearch : dataProduct}
              search={isSearch}
              totalRows={totalRows}
              handlePageChange={(page) => {
                router.replace(
                  `/dashboard/product/${props.adminMode}?start=${
                    (page - 1) * perPage
                  }&length=${perPage}`
                );
              }}
              handlePerRowsChange={(newpage) => {
                setPerPage(newpage);
                router.replace(
                  `/dashboard/product/${props.adminMode}?start=0&length=${newpage}`
                );
              }}
            />
          );
        }, [dataProduct, isSearch])}
      </div>
    </div>
  );
};

export default ManageProduct;
ManageProduct.getLayout = getLayout;
