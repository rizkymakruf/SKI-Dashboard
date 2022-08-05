import DataTable from "react-data-table-component";
import { GlobalContext } from "context/global";
import { useContext, memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import fetchJson, { FetchError } from "lib/fetchJson";
import Loading from "components/card/Loading";

const OrderTable = ({
  data,
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
      name: (
        <div className="w-full text-center font-bold text-red-500">
          KONFIRMASI
        </div>
      ),
      grow: 1,
      cell: (a) => (
        <div className="flex justify-center w-full">
          <label class="chck">
            <input
              type="checkbox"
              checked={
                a.status === "confirmed" ||
                a.status === "packed" ||
                a.status === "sent" ||
                a.status === "done"
              }
              disabled={
                a.status === "confirmed" ||
                a.status === "packed" ||
                a.status === "sent" ||
                a.status === "done"
              }
              onClick={async function handleSubmit(e) {
                e.preventDefault();
                globalAct.setIsFetch(true);

                const body = {
                  uri: "order/status",
                  key: a.key,
                  status: "confirm",
                };

                try {
                  await fetchJson("/api/prot/patch", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                  });

                  router.replace(`/dashboard/order/${globalCtx.currentBrand}`);
                } catch (error) {
                  console.log("error", error);
                  alert(globalCtx.errorMsg);
                  if (error instanceof FetchError) {
                    globalAct.setErrorMsg(error.data.message);
                  } else {
                    globalAct.setErrorMsg("An unexpected error happened");
                  }
                }

                globalAct.setIsFetch(false);
              }}
            />
            <span class="checkmark"></span>
          </label>
        </div>
      ),
    },
    {
      name: (
        <div className="w-full text-center font-bold text-red-500">DIKEMAS</div>
      ),
      grow: 1,
      cell: (a) => (
        <div className="flex justify-center w-full">
          <label class="chck">
            <input
              type="checkbox"
              checked={
                a.status === "packed" ||
                a.status === "sent" ||
                a.status === "done"
              }
              disabled={
                a.status !== "confirmed" ||
                a.status === "packed" ||
                a.status === "sent" ||
                a.status === "done"
              }
              onClick={async function handleSubmit(e) {
                e.preventDefault();
                globalAct.setIsFetch(true);

                const body = {
                  uri: "order/status",
                  key: a.key,
                  status: "pack",
                };

                try {
                  await fetchJson("/api/prot/patch", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                  });

                  router.replace(`/dashboard/order/${globalCtx.currentBrand}`);
                } catch (error) {
                  console.log("error", error);
                  alert(globalCtx.errorMsg);
                  if (error instanceof FetchError) {
                    globalAct.setErrorMsg(error.data.message);
                  } else {
                    globalAct.setErrorMsg("An unexpected error happened");
                  }
                }

                globalAct.setIsFetch(false);
              }}
            />
            <span class="checkmark"></span>
          </label>
        </div>
      ),
    },
    {
      name: (
        <div className="w-full text-center font-bold text-red-500">DIKIRIM</div>
      ),
      grow: 1,
      cell: (a) => (
        <div className="flex justify-center w-full ">
          <label class="chck">
            <input
              type="checkbox"
              checked={a.status === "sent" || a.status === "done"}
              disabled={a.status !== "confirmed" && a.status !== "packed"}
              onClick={async function handleSubmit(e) {
                e.preventDefault();
                globalAct.setIsFetch(true);

                const body = {
                  uri: "order/status",
                  key: a.key,
                  status: "send",
                };

                try {
                  await fetchJson("/api/prot/patch", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                  });

                  router.replace(`/dashboard/order/${globalCtx.currentBrand}`);
                } catch (error) {
                  console.log("error", error);
                  alert(globalCtx.errorMsg);
                  if (error instanceof FetchError) {
                    globalAct.setErrorMsg(error.data.message);
                  } else {
                    globalAct.setErrorMsg("An unexpected error happened");
                  }
                }

                globalAct.setIsFetch(false);
              }}
            />
            <span class="checkmark"></span>
          </label>
        </div>
      ),
    },

    {
      name: (
        <div className="w-full text-center font-bold text-red-500">STATUS</div>
      ),
      grow: 1,
      cell: (a) => (
        <div className="flex justify-center gap-x-2 w-full">
          <p
            className={`text-xs w-24 flex items-center justify-center font-bold shadow-md py-1 rounded-xl uppercase ${
              a.status === "unpaid"
                ? "bg-gray-500/30 text-gray-500"
                : a.status === "paid"
                ? "bg-slate-500/30 text-slate-500"
                : a.status === "confirmed"
                ? "bg-yellow-500/30 text-yellow-500"
                : a.status === "packed"
                ? "bg-blue-500/30 text-blue-500"
                : a.status === "sent"
                ? "bg-yellow-500/30 text-yellow-500"
                : a.status === "canceled"
                ? "bg-yellow-500/30 text-yellow-500"
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
        <div className="w-full text-center font-bold text-red-500">ACTION</div>
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
