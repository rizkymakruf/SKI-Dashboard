import { getLayout } from "components/layout/Navbar";
import DashboardCard from "components/card/DashboardCard";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { useContext, useEffect } from "react";
import { checkUid } from "lib/arangoDb";
import { useRouter } from "next/router";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import OrderCard from "components/card/OrderCard";
import Line from "components/chart/line";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import History from "components/table/History";
import Link from "next/link";

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

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
  });
},
sessionOptions);

const Dashboard = (props) => {
  const router = useRouter();
  {
    /* Default */
  }
  const { globalCtx, globalAct } = useContext(GlobalContext);
  useEffect(() => {
    globalAct.setIsFetch(false);
    globalAct.setErrorMsg("");
    // router.prefetch("/config/dashboard");
  }, []);
  useEffect(() => {
    console.log("fetch data status : ", globalCtx.isFetch);
  }, [globalCtx]);
  {
    /* Default */
  }

  return (
    <div className="w-full p-2 flex flex-col gap-y-4">
      <div>
        <hr />
      </div>
      <div className="flex items-center gap-x-4">
        <div className="duration-500 bg-white border-orange-300 border-2 shadow-md w-2/4 h-44 rounded-md flex flex-col justify-between hover:shadow-red-500">
          <Line />
        </div>
        <div className="duration-500 bg-white border-orange-300 border-2 shadow-md w-2/4 h-44 rounded-md flex flex-col justify-between hover:shadow-red-500">
          <Line />
        </div>
      </div>
      <div>
        <hr />
      </div>
      <div className="w-full flex flex-row items-center gap-x-4">
        <div className="w-full">
          <DashboardCard
            title={"Total Categorys"}
            content={"Categorys"}
            routes={"/dashboard/category"}
          />
        </div>
        <div className="w-full">
          <DashboardCard
            title={"Total Products"}
            content={"Products"}
            routes={"/dashboard/product"}
          />
        </div>
        <div className="w-full">
          <DashboardCard
            title={"Total Sold Items"}
            content={"Sold Items"}
            routes={"/dashboard/order"}
          />
        </div>
      </div>
      <div>
        <hr />
      </div>
      <div className="w-full flex flex-row items-center gap-x-4">
        <div className="w-72">
          <OrderCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
Dashboard.getLayout = getLayout;
