import DataTable from "react-data-table-component";
import { GlobalContext } from "context/global";
import { useContext, memo, useEffect, useState } from "react";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import LoadingMini from "components/card/LoadingMini";

const ProdukRekomenTable = ({
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
      name: <div className="font-bold text-red-500">Product Recomendation</div>,
      grow: 5,
      cell: (a) => (
        <div className="w-full h-full py-1 flex items-center flex-row gap-1">
          <p className="text-xs font-bold">{a.name}</p>
        </div>
      ),
    },
    {
      name: (
        <div className="w-full text-center font-bold text-red-500">
          {/* Product Rekomendation */}
        </div>
      ),
      grow: 2,
      cell: (a) => (
        <div className="flex flex-row items-center justify-center gap-x-2 w-full">
          <button
            globalCtx={globalCtx}
            globalAct={globalAct}
            onClick={async function handleSubmit(e) {
              e.preventDefault();
              globalAct.setIsFetch(true);

              const body = {
                uri: "product/recommend",
                key: a.key,
                action: "remove",
              };

              try {
                await fetchJson("/api/prot/post", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                });
              } catch (error) {
                console.log("error", error);
                if (error instanceof FetchError) {
                  globalAct.setErrorMsg(error.data.message);
                } else {
                  globalAct.setErrorMsg("An unexpected error happened");
                }
              }

              globalAct.setModal("deleteRekomen");
              globalAct.setIsFetch(false);
              router.reload("/dashboardSKI/produkRekomen");
            }}
            className={
              "bg-red-500/30 items-center justify-center h-8 w-8 rounded-md flex gap-x-2 text-xs text-red-500 hover:w-24 duration-150 hover:before:content-['Remove'] border border-red-300"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-auto relative ">
      {/* <div className=" py-3">
        <p className="text-red-500 font-bold">Recomendation List</p>
      </div> */}
      <div className="border-2 rounded-md">
        <DataTable
          columns={columns}
          data={data}
          responsive={true}
          highlightOnHover={true}
          pagination
          paginationServer
          paginationRowsPerPageOptions={[10]}
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          progressPending={pending}
          progressComponent={<LoadingMini />}
        />
      </div>
    </div>
  );
};

export default memo(ProdukRekomenTable);
