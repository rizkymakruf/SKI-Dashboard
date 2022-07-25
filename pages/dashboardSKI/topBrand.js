import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { topBrand, listBrand, checkUid, getTotalBrand } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import TopBrandTable from "components/table/TopBrand";
import SearchBrand from "components/search/Brand";
import TopBrandListTable from "components/table/TopBrandList";
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

  const tbrand = await topBrand();
  const brand = await listBrand(
    query.start ? parseInt(query.start) : 0,
    query.length ? parseInt(query.length) : 10
  );
  const totalBrand = await getTotalBrand();

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    pict:
      checkUids[0].pict !== "" ? checkUids[0].pict : "/img/user-default.png",
    outletPict: "/img/ski.png",
    tbrand: tbrand,
    brand: brand,
    totalBrand: totalBrand[0].total,
  });
},
sessionOptions);

const ManageTopBrand = (props) => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();
  const data = props.brand;
  console.log("brand", props.brand);

  const [totalRows, setTotalRows] = useState(props.totalBrand);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    globalAct.setFullname(props.fullName);
    globalAct.setUserPict(props.pict);
    globalAct.setOutletPict(props.outletPict);
    globalAct.setAdminMode("ski");
  }, []);

  return (
    <div className="w-full p-3 flex flex-col gap-y-2">
      <div className="border-2 border-orange-200 rounded-md p-5 shadow-md mb-3">
        {useMemo(() => {
          return (
            <TopBrandTable
              globalAct={globalAct}
              globalCtx={globalCtx}
              tbrand={props.tbrand}
            />
          );
        }, [props.tbrand])}
      </div>
      <div className="bg-white border border-gray-200 rounded-md p-5 shadow-md">
        {useMemo(() => {
          return (
            <TopBrandListTable
              data={data}
              totalRows={totalRows}
              handlePageChange={(page) => {
                router.replace(
                  `/dashboardSKI/topBrand?start=${
                    (page - 1) * perPage
                  }&length=${perPage}`
                );
              }}
              handlePerRowsChange={(newpage) => {
                setPerPage(newpage);
                router.replace(
                  `/dashboardSKI/topBrand?start=0&length=${newpage}`
                );
              }}
            />
          );
        }, [data])}
      </div>
    </div>
  );
};

export default ManageTopBrand;
ManageTopBrand.getLayout = getLayout;
