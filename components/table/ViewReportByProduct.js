import DataTable from "react-data-table-component";
import { GlobalContext } from "context/global";
import { useContext } from "react";

const ViewReportByProductTable = ({}) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const data = [
    {
      name: "Coffee enak",
      outlet: "Red White Coffee",
      order: "208 order",
      income: "Rp 23.540.000,-",
    },
    {
      name: "Coffee hitam",
      outlet: "Black White Coffee",
      order: "198 order",
      income: "Rp 33.543.000,-",
    },
    {
      name: "Coffee Blend",
      outlet: "Blue White Coffee",
      order: "99 order",
      income: "Rp 13.400.000,-",
    },
    {
      name: "Coffee enak",
      outlet: "Red White Coffee",
      order: "208 order",
      income: "Rp 23.540.000,-",
    },
    {
      name: "Coffee hitam",
      outlet: "Black White Coffee",
      order: "198 order",
      income: "Rp 33.543.000,-",
    },
    {
      name: "Coffee Blend",
      outlet: "Blue White Coffee",
      order: "99 order",
      income: "Rp 13.400.000,-",
    },
    {
      name: "Coffee 1",
      outlet: "Other 1 Coffee",
      order: "0 order",
      income: "Rp 0,-",
    },
    {
      name: "Coffee 2",
      outlet: "Other 2 Coffee",
      order: "0 order",
      income: "Rp 0,-",
    },
    {
      name: "Coffee 3",
      outlet: "Other 3 Coffee",
      order: "0 order",
      income: "Rp 0,-",
    },
    {
      name: "Coffee 2",
      outlet: "Other 2 Coffee",
      order: "0 order",
      income: "Rp 0,-",
    },
    {
      name: "Coffee 3",
      outlet: "Other 3 Coffee",
      order: "0 order",
      income: "Rp 0,-",
    },
  ];
  const columns = [
    {
      name: <div className="font-bold text-red-500">Product Name</div>,
      grow: 10,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1">
          <p className="text-xs font-bold">{a.name}</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Outlet Name</div>,
      grow: 10,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1">
          <p className="text-xs font-bold">{a.outlet}</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Total Order</div>,
      grow: 10,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1">
          <p className="text-xs font-bold">{a.order}</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Total Income</div>,
      grow: 10,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1">
          <p className="text-xs font-bold">{a.income}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-auto relative ">
      <div className="shadow-md border-2 rounded-md">
        <DataTable
          // title={
          //   <p className="text-red-500 font-bold text-sm">Category List</p>
          // }
          columns={columns}
          data={data}
          responsive={true}
          highlightOnHover={true}
          pagination
        />
      </div>
    </div>
  );
};

export default ViewReportByProductTable;
