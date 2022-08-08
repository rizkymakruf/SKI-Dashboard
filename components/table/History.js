import DataTable from "react-data-table-component";
import { GlobalContext } from "context/global";
import { useContext, memo, useEffect, useState } from "react";
import Loading from "components/card/Loading";

const OrderTable = ({
  data,
  totalRows,
  handlePageChange,
  handlePerRowsChange,
}) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(data);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const columns = [
    {
      name: <div className="font-bold text-red-500">INVOICE</div>,
      grow: 1,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1 items-center">
          <p className="text-xs font-bold">{a.invoice}</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">User Order</div>,
      grow: 1,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1 items-center">
          <p className="text-xs font-bold">{a.customer?.address?.name}</p>
        </div>
      ),
    },
    {
      name: (
        <div className="w-full text-center font-bold text-red-500">Status</div>
      ),
      grow: 1,
      cell: (a) => (
        <div className="w-full h-full py-1 flex justify-center flex-row gap-1 items-center">
          <p
            className={`text-xs font-bold px-2 shadow-md py-1 rounded-xl ${
              a.status === "canceled"
                ? "bg-red-500/30 text-red-500"
                : a.status == "done" && "bg-green-500/30 text-green-500"
            }`}
          >
            {a.status}
          </p>
        </div>
      ),
    },
    {
      name: (
        <div className="w-full text-center font-bold text-red-500">Action</div>
      ),
      grow: 2,
      cell: (a) => (
        <div className="flex flex-row items-center justify-center gap-x-2 w-full">
          <button
            onClick={() => {
              globalAct.setModal("userOrder"), globalAct.setDetailOrder(a);
            }}
            className={
              "bg-orange-500/30 items-center justify-center h-8 w-8 rounded-md hover:bg-orange-500/50 shadow-md flex gap-x-2 text-xs text-orange-500 hover:w-24 duration-150 hover:before:content-['Info'] border border-orange-300"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-orange-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-auto relative border shadow rounded">
      <DataTable
        // title={<p className="text-red-500 font-bold">Order List</p>}
        columns={columns}
        data={data}
        responsive={true}
        highlightOnHover={true}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        progressPending={pending}
        progressComponent={<Loading />}
      />
    </div>
  );
};

export default memo(OrderTable);
