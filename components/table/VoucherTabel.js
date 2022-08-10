import DataTable from "react-data-table-component";
import { GlobalContext } from "context/global";
import { useContext, memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import fetchJson, { FetchError } from "lib/fetchJson";
import Loading from "components/card/Loading";
import moment from "moment";

const VoucherTable = ({
  voc,
  search,
  totalRows,
  handlePageChange,
  handlePerRowsChange,
}) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const router = useRouter();

  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(voc);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const columns = [
    {
      name: <div className="font-bold text-red-500">Voucher</div>,
      grow: 1,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1 items-center">
          <p className="text-xs font-bold">{a.name}</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Minimum Belanja</div>,
      grow: 1,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1 items-center">
          <p className="text-xs font-bold">Rp {a.min}</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Persent</div>,
      grow: 1,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1 items-center">
          <p className="text-xs font-bold">{a.percentage} %</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Mulai</div>,
      grow: 1,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1 items-center">
          <p className="text-xs font-bold">
            {/* {moment(Date(a.started)).format("MM/DD/YYYY")} */}
            {new Date(a.started * 1000).toLocaleDateString()}
          </p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Berakhir</div>,
      grow: 1,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1 items-center">
          <p className="text-xs font-bold">
            {/* {moment(a.expired).format("MM/DD/YYYY")} */}
            {new Date(a.expired * 1000).toLocaleDateString()}
          </p>
        </div>
      ),
    },
    {
      name: (
        <div className="w-full text-center font-bold text-red-500">Action</div>
      ),
      grow: 1,
      cell: (a) => (
        <div className="flex flex-row items-center justify-center gap-x-2 w-full">
          <button
            onClick={() => alert("update")}
            className={
              "bg-blue-500/30 items-center justify-center h-8 w-8 rounded-md hover:bg-blue-500/50 shadow-md flex gap-x-2 text-xs text-blue-500 hover:w-24 duration-200 hover:before:content-['Edit'] border border-blue-300"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              globalAct.setModal("deleteVoucher");
              globalAct.setSelectedData({
                ...globalCtx.selectedData,
                key: a.key,
                name: a.name,
              });
              // globalAct.setSelectedData({
              //   pict: "/img/outlet-default.png",
              //   key: a.key,
              // });
            }}
            className={
              "bg-red-500/30 items-center justify-center h-8 w-8 rounded-md hover:bg-red-500/50 shadow-md flex gap-x-2 text-xs text-red-500 hover:w-24 duration-150 hover:before:content-['Remove'] border border-red-300"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-auto relative ">
      <div className="shadow-md border-2 rounded-md">
        {search ? (
          <DataTable
            // title={
            //   <p className="text-red-500 font-bold text-sm">Category List</p>
            // }
            columns={columns}
            data={voc}
            responsive={true}
            highlightOnHover={true}
            paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50]}
            pagination
          />
        ) : (
          <DataTable
            // title={
            //   <p className="text-red-500 font-bold text-sm">Category List</p>
            // }
            columns={columns}
            data={voc}
            responsive={true}
            highlightOnHover={true}
            pagination
            paginationServer
            paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50]}
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            progressPending={pending}
            progressComponent={<Loading />}
          />
        )}
      </div>
    </div>
  );
};

export default memo(VoucherTable);
