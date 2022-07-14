import { checkUid, findOutlet } from "lib/arangoDb";
import { useRouter } from "next/router";
import Line from "components/chart/line";
import { sessionOptions } from "lib/session";
import { useContext, useEffect } from "react";
import { GlobalContext } from "context/global";
import OrderCard from "components/card/OrderCard";
import { getLayout } from "components/layout/Navbar";
import { withIronSessionSsr } from "iron-session/next";
import DashboardCard from "components/card/DashboardCard";
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
  }, []);

  useEffect(() => {
    console.log("fetch data status : ", globalCtx.isFetch);
  }, [globalCtx]);

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
