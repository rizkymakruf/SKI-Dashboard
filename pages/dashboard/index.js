import { getLayout } from "components/layout/Navbar";

import DashboardCard from "components/card/DashboardCard";
import OrderCard from "components/card/OrderCard";
import History from "components/table/History";
import Line from "components/chart/line";

const Dashboard = () => {
  return (
    <div className='w-full p-2 flex flex-col gap-y-4'>
      <div>
        <hr />
      </div>
      <div className='flex items-center gap-x-4'>
        <div className='duration-500 bg-white border-orange-300 border-2 shadow-md w-2/4 h-44 rounded-md flex flex-col justify-between hover:shadow-red-500'>
          <Line />
        </div>
        <div className='duration-500 bg-white border-orange-300 border-2 shadow-md w-2/4 h-44 rounded-md flex flex-col justify-between hover:shadow-red-500'>
          <Line />
        </div>
      </div>
      <div>
        <hr />
      </div>
      <div className='w-full flex flex-row items-center gap-x-4'>
        <div className='w-full'>
          <DashboardCard
            title={"Total Categorys"}
            content={"Categorys"}
            routes={"/dashboard/category"}
          />
        </div>
        <div className='w-full'>
          <DashboardCard
            title={"Total Products"}
            content={"Products"}
            routes={"/dashboard/product"}
          />
        </div>
        <div className='w-full'>
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
      <div className='w-full flex flex-row items-center gap-x-4'>
        <div className='w-72'>
          <OrderCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
Dashboard.getLayout = getLayout;
