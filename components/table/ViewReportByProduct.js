import { memo, useCallback } from "react";
import DataTable from "react-data-table-component";

const ViewReportByProductTable = ({
  data,
  totalRows,
  handlePageChange,
  handlePerRowsChange,
}) => {
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
      name: <div className="font-bold text-red-500">Sold</div>,
      grow: 10,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1">
          <p className="text-xs font-bold">
            {a.order !== null ? a.order : 0} item
          </p>
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
          paginationServer
          pagination
          paginationRowsPerPageOptions={[10]}
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default memo(ViewReportByProductTable);
