import { getLayout } from "components/layout/Navbar";

import OrderTable from "components/table/OrderTable";

const ManageOrder = () => {
  return (
    <div className="w-full p-2 flex flex-col gap-y-2">
      <OrderTable />
    </div>
  );
};

export default ManageOrder;
ManageOrder.getLayout = getLayout;
