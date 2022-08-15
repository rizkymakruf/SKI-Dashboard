import Line from "components/chart/line";
import Line1 from "components/chart/line1";
import { getLayout } from "components/layout/Navbar";
import DashboardCard from "components/card/DashboardCard";
import { useRouter } from "next/router";
import { sessionOptions } from "lib/session";
import { GlobalContext } from "context/global";
import { useContext, useEffect, useMemo } from "react";
import { withIronSessionSsr } from "iron-session/next";
import {
  checkUid,
  findOutlet,
  getOutletByShortname,
  getOutletDashboardQty,
  getOutletDashboardRp,
  getOutletDashboardCategory,
  getOutletDashboardOrder,
  getOutletDashboardUnpack,
  getOutletDashboardProduct,
} from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";

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

  global.atob = require("atob");

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
  const qty = await getOutletDashboardQty(keyOutlet[0].key);
  const rp = await getOutletDashboardRp(keyOutlet[0].key);
  const cat = await getOutletDashboardCategory(keyOutlet[0].key);
  const order = await getOutletDashboardOrder(keyOutlet[0].key);
  const unpack = await getOutletDashboardUnpack(keyOutlet[0].key);
  const product = await getOutletDashboardProduct(keyOutlet[0].key);

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    adminMode: outlet.length > 0 ? outlet[0]?.shortname : query.pid,
    ski: checkUids[0].outlet !== "" ? false : true,
    outletPict: "/img/ski.png",
    qty: qty,
    rp: rp,
    cat: cat,
    order: order,
    unpack: unpack,
    product: product,
  });
},
sessionOptions);

const Dashboard = (props) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    globalAct.setAdminMode("outlet");
    globalAct.setFullname(props.fullName);
    globalAct.setIsFetch(false);
    globalAct.setErrorMsg("");
    globalAct.setCurrentBrand(props.adminMode);
    globalAct.setSki(props.ski);
    globalAct.setOutletPict(props.outletPict);
  }, []);

  useEffect(() => {
    console.log("props qty : ", props.qty);
    console.log("props rp : ", props.rp);
    console.log("props cat : ", props.cat);
    console.log("props order : ", props.order);
    console.log("props unpack : ", props.unpack);
    console.log("props product : ", props.product);
  }, [globalCtx]);

  return (
    <div className="w-full p-4 flex flex-col gap-y-4">
      {useMemo(
        () => (
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="w-full border border-gray-200 rounded-md hover:shadow-md hover:shadow-red-500 px-3 py-6">
              <p className="pb-2 text-red-500 font-semibold">
                Penjualan Perbulan
              </p>
              <div className="bg-white w-full h-44 rounded-md flex flex-col justify-between">
                <Line1 qty={props.qty} />
              </div>
            </div>
            <div className="w-full border border-gray-200 rounded-md hover:shadow-md hover:shadow-red-500 px-3 py-6">
              <p className="pb-2 text-red-500 font-semibold">
                Pendapatan Perbulan
              </p>
              <div className="bg-white  w-full h-44 rounded-md flex flex-col justify-between">
                <Line rp={props.rp} />
              </div>
            </div>
          </div>
        ),
        [props.qty, props.rp]
      )}
      <div>
        <hr />
      </div>
      {useMemo(
        () => (
          <div className="w-full flex flex-row items-center gap-x-4">
            <div className="w-full">
              <DashboardCard
                title={"Manage Kategori"}
                content={"Kategori"}
                jml={props.cat}
                routes={`/dashboard/category/${globalCtx.currentBrand}`}
              />
            </div>
            <div className="w-full">
              <DashboardCard
                title={"Manage Produk"}
                content={"Produk"}
                jml={props.product}
                routes={`/dashboard/product/${globalCtx.currentBrand}`}
              />
            </div>
            <div className="w-full">
              <DashboardCard
                title={"Manage Order"}
                content={"Order belum dikemas"}
                jml={props.unpack}
                routes={`/dashboard/order/${globalCtx.currentBrand}`}
              />
            </div>
            <div className="w-full">
              <DashboardCard
                title={"Manage Order"}
                content={"Order Baru"}
                jml={props.order}
                routes={`/dashboard/order/${globalCtx.currentBrand}`}
              />
            </div>
          </div>
        ),
        [globalCtx.currentBrand]
      )}
      <div className="w-full flex flex-row items-center gap-x-4">
        <div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
Dashboard.getLayout = getLayout;
