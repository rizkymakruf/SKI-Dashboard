import { getLayout } from "components/layout/Navbar";
import DashboardCardSKI from "components/card/DashboardCardSKI";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "context/global";
import AddOtlet from "components/card/AddOtlet";

const Otlets = (props) => {
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
    <div className="w-full p-4 flex flex-col gap-y-4">
      <AddOtlet globalAct={globalAct} globalCtx={globalCtx} />
      <div>
        <hr />
      </div>

      <div className="w-full grid grid-cols-3 items-center gap-4">
        <div className="w-full">
          <DashboardCardSKI
            otlet={"Red White Coffee"}
            order={"180"}
            products={"1100"}
            subCategory={"11"}
            route={"/outlet/redwhite"}
          />
        </div>
        <div className="w-full">
          <DashboardCardSKI
            otlet={"Blue Green Coffee"}
            order={"280"}
            products={"100"}
            subCategory={"18"}
            route={"/outlet/redwhite"}
          />
        </div>
        <div className="w-full">
          <DashboardCardSKI
            otlet={"White Black Coffee"}
            order={"208"}
            products={"900"}
            subCategory={"8"}
            route={"/outlet/redwhite"}
          />
        </div>
        <div className="w-full">
          <DashboardCardSKI
            otlet={"Red White Coffee"}
            order={"180"}
            products={"1100"}
            subCategory={"11"}
            route={"/outlet/redwhite"}
          />
        </div>
        <div className="w-full">
          <DashboardCardSKI
            otlet={"Blue Green Coffee"}
            order={"280"}
            products={"100"}
            subCategory={"18"}
            route={"/outlet/redwhite"}
          />
        </div>
        <div className="w-full">
          <DashboardCardSKI
            otlet={"White Black Coffee"}
            order={"208"}
            products={"900"}
            subCategory={"8"}
            route={"/outlet/redwhite"}
          />
        </div>
      </div>
      {/* <div>
        <hr />
      </div>
      <div className="w-full flex flex-row items-center gap-x-4">
        <div className="w-72">
          <OrderCard />
        </div>
      </div> */}
    </div>
  );
};

export default Otlets;
Otlets.getLayout = getLayout;
