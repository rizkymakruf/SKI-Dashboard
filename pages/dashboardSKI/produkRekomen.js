import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";
import ProdukRekomenTable from "components/table/ProdukRekomen";
import ProdukRekomenListTable from "components/table/ProdukRekomenList";
import SearchProduct from "components/search/Product";

import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import {
  getProducts,
  getProductsRecomd,
  checkUid,
  getTotalProductsRecomd,
  getTotalProducts,
} from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import Products from "components/table/Products";

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

  const product = await getProducts();
  const recomd = await getProductsRecomd();
  const totalRecomd = await getTotalProductsRecomd();
  const totalProduct = await getTotalProducts();

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    pict:
      checkUids[0].pict !== "" ? checkUids[0].pict : "/img/user-default.png",
    outletPict: "/img/ski.png",
    product: product,
    recomd: recomd,
    totalProduct: totalProduct[0].total,
    totalRecomd: totalRecomd[0].total,
  });
},
sessionOptions);

const ManageProdukRekomen = (props) => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();
  const [data, setData] = useState(props.product);
  const [recomd, setRecomd] = useState(props.recomd);
  const [searchData, setSearchData] = useState([]);

  const [totalRows, setTotalRows] = useState(props.totalProduct);
  const [totalRowsRec, setTotalRowsRec] = useState(props.totalRecomd);
  const [perPage, setPerPage] = useState(10);
  const [perPageRec, setPerPageRec] = useState(10);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    globalAct.setFullname(props.fullName);
    globalAct.setUserPict(props.pict);
    globalAct.setOutletPict(props.outletPict);
    globalAct.setAdminMode("ski");
  }, []);

  const handlePageChange = useCallback((page) => {
    fetchData((page - 1) * perPage, perPage, "p");
  }, []);

  const handlePageChangeRec = useCallback((page) => {
    fetchData((page - 1) * perPage, perPage, "r");
  }, []);

  const handlePerRowsChange = useCallback((newPerPage, page) => {
    setPerPage(newPerPage);
    fetchData(0, newPerPage, "p");
  }, []);

  const handlePerRowsChangeRec = useCallback((newPerPage, page) => {
    setPerPageRec(newPerPage);
    fetchData(0, newPerPage, "r");
  }, []);

  const fetchData = useCallback(async (start, page, type) => {
    globalAct.setIsFetch(true);
    const body = {
      uri: type === "p" ? "product/other" : type === "r" && "product/recommend",
      action: type === "r" ? "list" : null,
      start: start,
      length: page,
    };
    try {
      const res = await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (type === "p") {
        setData(res.data);
        setTotalRows(res.total);
      } else if (type === "r") {
        setRecomd(res.data);
        setTotalRowsRec(res.total);
      }
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
    <div className="w-full flex flex-col p-5 gap-y-5">
      <div className="w-full p-4 border border-gray-200 rounded-md shadow-md">
        {useMemo(() => {
          console.log("search");
          return (
            <SearchProduct
              setSearchData={setSearchData}
              setIsSearch={setIsSearch}
            />
          );
        }, [])}
        {useMemo(() => {
          console.log("tabel");
          return !isSearch ? (
            <div className="flex gap-6 my-4">
              <ProdukRekomenListTable
                data={data}
                totalRows={totalRows}
                handlePageChange={handlePageChange}
                handlePerRowsChange={handlePerRowsChange}
              />
              <ProdukRekomenTable
                data={recomd}
                totalRows={totalRowsRec}
                handlePageChange={handlePageChangeRec}
                handlePerRowsChange={handlePerRowsChangeRec}
              />
            </div>
          ) : (
            <div className="flex gap-6 my-4">
              <Products data={searchData} />
            </div>
          );
        }, [searchData])}
      </div>
    </div>
  );
};

export default ManageProdukRekomen;
ManageProdukRekomen.getLayout = getLayout;
