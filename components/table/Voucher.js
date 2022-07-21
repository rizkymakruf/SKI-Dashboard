import DataTable from "react-data-table-component";
import { GlobalContext } from "context/global";
import { useContext, memo } from "react";

const VoucherTable = ({
  data,
  totalRows,
  handlePageChange,
  handlePerRowsChange,
}) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);

  const columns = [
    {
      name: <div className="font-bold text-red-500">Voucher From</div>,
      grow: 10,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1">
          <p className="text-xs font-bold">{a.outlet}</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Voucher Name</div>,
      grow: 10,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1">
          <p className="text-xs font-bold">{a.name}</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Voucher Expired</div>,
      grow: 10,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1">
          <p className="text-xs font-bold">{a.expired}</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Minimum</div>,
      grow: 10,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1">
          <p className="text-xs font-bold">Rp {a.min}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-auto relative ">
      <div className=" py-3">
        <p className="text-red-500 font-bold text-md">Voucher List</p>
      </div>
      <div className="border-2 rounded-md">
        <DataTable
          columns={columns}
          data={data}
          responsive={true}
          highlightOnHover={true}
          pagination
          paginationServer
          paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50]}
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default memo(VoucherTable);
