import Line from "components/chart/line";
import Line1 from "components/chart/line1";
import { getLayout } from "components/layout/Navbar";
import DashboardCard from "components/card/DashboardCard";
import { useRouter } from "next/router";
import { sessionOptions } from "lib/session";
import { GlobalContext } from "context/global";
import { useContext, useEffect } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { checkUid, findOutlet } from "lib/arangoDb";
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

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    adminMode: outlet.length > 0 ? outlet[0]?.shortname : query.pid,
    ski: checkUids[0].outlet !== "" ? false : true,
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
  }, []);

  useEffect(() => {
    console.log("fetch data status : ", globalCtx.isFetch);
  }, [globalCtx]);

  return (
    <div className="w-full p-4 flex flex-col gap-y-4">
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="w-full border border-gray-200 rounded-md hover:shadow-md hover:shadow-red-500 px-3 py-6">
          <p className="pb-2 text-red-500 font-semibold">Penjualan Perbulan</p>
          <div className="bg-white w-full h-44 rounded-md flex flex-col justify-between">
            <Line1 qty={props.qty} />
          </div>
        </div>
        <div className="w-full border border-gray-200 rounded-md hover:shadow-md hover:shadow-red-500 px-3 py-6">
          <p className="pb-2 text-red-500 font-semibold">Pendapatan Perbulan</p>
          <div className="bg-white  w-full h-44 rounded-md flex flex-col justify-between">
            <Line rp={props.rp} />
          </div>
        </div>
      </div>
      <div>
        <hr />
      </div>
      <div className="w-full flex flex-row items-center gap-x-4">
        <div className="w-full">
          <DashboardCard
            title={"Manage Kategori"}
            content={"Kategori"}
            jml={"20"}
            routes={`/dashboard/category/${globalCtx.currentBrand}`}
          />
        </div>
        <div className="w-full">
          <DashboardCard
            title={"Manage Produk"}
            content={"Produk"}
            jml={"180"}
            routes={`/dashboard/product/${globalCtx.currentBrand}`}
          />
        </div>
        <div className="w-full">
          <DashboardCard
            title={"Manage Order"}
            content={"Order belum dikemas"}
            jml={"100"}
            routes={`/dashboard/order/${globalCtx.currentBrand}`}
          />
        </div>
        <div className="w-full">
          <DashboardCard
            title={"Manage Order"}
            content={"Order Masuk"}
            jml={"230"}
            routes={`/dashboard/order/${globalCtx.currentBrand}`}
          />
        </div>
      </div>
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
