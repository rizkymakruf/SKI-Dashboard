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
  const data = [
    {
      outlet: "Red White Coffee",
      order: "120",
      product: "321",
      subcategory: "11",
      route: "/outlet/redwhite",
    },
    {
      outlet: "Blue Green Coffee",
      order: "55",
      product: "98",
      subcategory: "87",
      route: "/outlet/redwhite",
    },
    {
      outlet: "White Black Coffee",
      order: "80",
      product: "90",
      subcategory: "9",
      route: "/outlet/redwhite",
    },
    {
      outlet: "Red White Coffee",
      order: "88",
      product: "108",
      subcategory: "8",
      route: "/outlet/redwhite",
    },
    {
      outlet: "Blue Green Coffee",
      order: "11",
      product: "201",
      subcategory: "7",
      route: "/outlet/redwhite",
    },
    {
      outlet: "White Black Coffee",
      order: "51",
      product: "100",
      subcategory: "5",
      route: "/outlet/redwhite",
    },
  ];

  return (
    <div className="w-full p-4 flex flex-col gap-y-4">
      <AddOtlet globalAct={globalAct} globalCtx={globalCtx} />
      <div>
        <hr />
      </div>

      <div className="w-full grid grid-cols-3 items-center gap-4">
        {data.map((dat, idx) => {
          return (
            <div className="w-full">
              <DashboardCardSKI
                globalAct={globalAct}
                globalCtx={globalCtx}
                otlet={dat.outlet}
                order={dat.order}
                products={dat.product}
                subCategory={dat.subcategory}
                route={dat.route}
              />
            </div>
          );
        })}
        {/* <div className="w-full">
          <DashboardCardSKI
            globalAct={globalAct}
            globalCtx={globalCtx}
            otlet={"Red White Coffee"}
            order={"180"}
            products={"1100"}
            subCategory={"11"}
            route={"dashboard"}
          />
        </div>
        <div className="w-full">
          <DashboardCardSKI
            globalAct={globalAct}
            globalCtx={globalCtx}
            otlet={"Blue Green Coffee"}
            order={"280"}
            products={"100"}
            subCategory={"18"}
            route={"dashboard"}
          />
        </div>
        <div className="w-full">
          <DashboardCardSKI
            globalAct={globalAct}
            globalCtx={globalCtx}
            otlet={"White Black Coffee"}
            order={"208"}
            products={"900"}
            subCategory={"8"}
            route={"dashboard"}
          />
        </div>
        <div className="w-full">
          <DashboardCardSKI
            globalAct={globalAct}
            globalCtx={globalCtx}
            otlet={"Red White Coffee"}
            order={"180"}
            products={"1100"}
            subCategory={"11"}
            route={"dashboard"}
          />
        </div>
        <div className="w-full">
          <DashboardCardSKI
            globalAct={globalAct}
            globalCtx={globalCtx}
            otlet={"Blue Green Coffee"}
            order={"280"}
            products={"100"}
            subCategory={"18"}
            route={"dashboard"}
          />
        </div>
        <div className="w-full">
          <DashboardCardSKI
            globalAct={globalAct}
            globalCtx={globalCtx}
            otlet={"White Black Coffee"}
            order={"208"}
            products={"900"}
            subCategory={"8"}
            route={"dashboard"}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Otlets;
Otlets.getLayout = getLayout;
