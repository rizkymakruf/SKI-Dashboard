import DataTable from "react-data-table-component";
import { GlobalContext } from "context/global";
import { useContext, memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import fetchJson, { FetchError } from "lib/fetchJson";
import Loading from "components/card/Loading";

const DiscountTable = ({
  disc,
  totalRows,
  handlePageChange,
  handlePerRowsChange,
  setIsUpdate,
}) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const router = useRouter();

  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(disc);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  const columns = [
    {
      name: (
        <div className="w-full text-center font-bold text-red-500">
          DISCOUNT
        </div>
      ),
      grow: 2,
      cell: (a) => (
        <div className="w-full h-full py-1 flex justify-center flex-row gap-1 items-center">
          <p className="text-xs font-bold">{a.percentage} %</p>
        </div>
      ),
    },
    {
      name: (
        <div className="w-full text-center font-bold text-red-500">
          JUMLAH PRODUK
        </div>
      ),
      grow: 2,
      cell: (a) => (
        <div className="w-full h-full py-1 flex justify-center flex-row gap-1 items-center">
          <p className="text-xs font-bold">{a.products} products</p>
        </div>
      ),
    },
    {
      name: (
        <div className="w-full text-center font-bold text-red-500">ACTION</div>
      ),
      grow: 3,
      cell: (a) => (
        <div className="flex flex-row items-center justify-center gap-x-2 w-full">
          <button
            onClick={async function handleSubmit(e) {
              e.preventDefault();
              globalAct.setIsFetch(true);

              const body = {
                uri: "discount/detail",
                key: a.key,
              };

              try {
                const res = await fetchJson("/api/prot/post", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                });
                console.log(res.data);
                globalAct.setSelectedData({
                  ...globalCtx.selectedData,
                  key: a.key,
                  discount: a.percentage,
                  products: res.data,
                });
                globalAct.setModal("detailDiscount");
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
            className={
              "bg-orange-500/30 items-center justify-center h-8 w-8 rounded-md hover:bg-orange-500/50 shadow-md flex gap-x-2 text-xs text-orange-500 hover:w-24 duration-150 hover:before:content-['View'] border border-orange-300"
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
          <button
            onClick={async function handleSubmit(e) {
              e.preventDefault();
              globalAct.setIsFetch(true);

              const body = {
                uri: "discount/detail",
                key: a.key,
              };

              try {
                const res = await fetchJson("/api/prot/post", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                });
                console.log(res.data);
                globalAct.setSelectedData({
                  ...globalCtx.selectedData,
                  key: a.key,
                  discount: a.percentage,
                  products: res.data,
                });
                setIsUpdate(true);
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
              globalAct.setModal("deleteDiscount");
              globalAct.setSelectedData({
                ...globalCtx.selectedData,
                key: a.key,
                percentage: a.percentage,
              });
            }}
            className={
              "bg-red-500/30 items-center justify-center h-8 w-8 rounded-md hover:bg-red-500/50 shadow-md flex gap-x-2 text-xs text-red-500 hover:w-24 duration-200 hover:before:content-['Delete'] border border-red-300"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
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
        <DataTable
          // title={
          //   <p className="text-red-500 font-bold text-sm">Category List</p>
          // }
          columns={columns}
          data={disc}
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
      </div>
    </div>
  );
};

export default memo(DiscountTable);
