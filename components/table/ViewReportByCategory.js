import DataTable from "react-data-table-component";
import { GlobalContext } from "context/global";
import { useContext } from "react";

const ViewReportByCategoryTable = ({}) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const data = [
    {
      name: "Coffee",
      order: "208 order",
      income: "Rp 21.540.000,-",
    },
    {
      name: "Machine Coffee",
      order: "198 order",
      income: "Rp 133.543.000,-",
    },
    {
      name: "Other",
      order: "99 order",
      income: "Rp 13.400.000,-",
    },
    {
      name: "Category 1",
      order: "0 order",
      income: "Rp 0,-",
    },
    {
      name: "Category 2",
      order: "0 order",
      income: "Rp 0,-",
    },
    {
      name: "Category 3",
      order: "0 order",
      income: "Rp 0,-",
    },
    {
      name: "Category 4",
      order: "0 order",
      income: "Rp 0,-",
    },
    {
      name: "Category 5",
      order: "0 order",
      income: "Rp 0,-",
    },
    {
      name: "Category 6",
      order: "0 order",
      income: "Rp 0,-",
    },
    {
      name: "Category 7",
      order: "0 order",
      income: "Rp 0,-",
    },
    {
      name: "Category 8",
      order: "0 order",
      income: "Rp 0,-",
    },
    {
      name: "Category 9",
      order: "0 order",
      income: "Rp 0,-",
    },
  ];
  const columns = [
    {
      name: <div className="font-bold text-red-500">Category Name</div>,
      grow: 10,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1">
          <p className="text-xs font-bold">{a.name}</p>
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

export default ViewReportByCategoryTable;
