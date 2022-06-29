import React from "react";
import DataTable from "react-data-table-component";

const ViewReportByProductTable = ({data}) => {
  
  const CountIncome = (a) => {
    var x = 0
    a.map(e => x += e.order)
    return x
  }

  const CountProduct = (a) => {
    var x = 0
    a.map(e => x += e.qty)
    return x
  }

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
          <p className="text-xs font-bold">{a.order ? a.order.length : 0}</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Total Product</div>,
      grow: 10,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1">
          <p className="text-xs font-bold">{a.order ? CountProduct(a.order) : 0}</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Total Income</div>,
      grow: 10,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1">
          <p className="text-xs font-bold">{a.order ? CountIncome(a.order) : 0}</p>
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

export default React.memo(ViewReportByProductTable);
