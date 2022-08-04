import { getLayout } from "components/layout/Navbar";
import OrderTable from "components/table/OrderTable";
import fetchJson, { FetchError } from "lib/fetchJson";
import Filter from "components/card/Filter";
import { useRouter } from "next/router";
import { sessionOptions } from "lib/session";
import { useContext, useEffect, useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import {
  checkUid,
  findOutlet,
  getAllOrder,
  getOutletByShortname,
  getOrderPacked,
  getOrderConfirmed,
  totalAllOrder,
  totalOrderPacked,
  totalOrderConfirmed,
} from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import { GlobalContext } from "context/global";

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
  const allOrder = await getAllOrder(
    keyOutlet[0].key,
    query.start ? parseInt(query.start) : 0,
    query.length ? parseInt(query.length) : 10
  );
  const orderPacked = await getOrderPacked(
    keyOutlet[0].key,
    query.start ? parseInt(query.start) : 0,
    query.length ? parseInt(query.length) : 10
  );
  const orderConfirmed = await getOrderConfirmed(
    keyOutlet[0].key,
    query.start ? parseInt(query.start) : 0,
    query.length ? parseInt(query.length) : 10
  );
  const totalOrder = await totalAllOrder(keyOutlet[0].key);
  const totalPacked = await totalOrderPacked(keyOutlet[0].key);
  const totalConfirmed = await totalOrderConfirmed(keyOutlet[0].key);

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    adminMode: outlet.length > 0 ? outlet[0]?.shortname : query.pid,
    ski: checkUids[0].outlet !== "" ? false : true,
    outletPict: "/img/ski.png",
    dataOrder:
      query.type === "confirmed"
        ? orderConfirmed
        : query.type === "packed"
        ? orderPacked
        : allOrder,
    totalOrder:
      query.type === "confirmed"
        ? totalConfirmed[0].total
        : query.type === "packed"
        ? totalPacked[0].total
        : totalOrder[0].total,
  });
},
sessionOptions);

const ManageOrder = (props) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const router = useRouter();

  const [totalRows, setTotalRows] = useState(props.totalOrder);
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
    console.log("fetch data status : ", globalCtx.isFetch);
  }, [globalCtx]);
  console.log(router.query.type);

  return (
    <div className="w-full p-4 flex flex-col gap-y-2">
      <Filter />
      <OrderTable
        data={props.dataOrder}
        totalRows={totalRows}
        handlePageChange={(page) => {
          router.replace(
            `/dashboard/order/${props.adminMode}?type=${
              router.query?.type !== undefined ? router.query?.type : "all"
            }&start=${(page - 1) * perPage}&length=${perPage}`
          );
        }}
        handlePerRowsChange={(newpage) => {
          setPerPage(newpage);
          router.replace(
            `/dashboard/order/${props.adminMode}?type=${
              router.query?.type !== undefined ? router.query?.type : "all"
            }&start=0&length=${newpage}`
          );
        }}
      />
    </div>
  );
};

export default ManageOrder;
ManageOrder.getLayout = getLayout;
