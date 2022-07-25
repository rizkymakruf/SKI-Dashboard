import DataTable from "react-data-table-component";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useContext, memo } from "react";
import { useRouter } from "next/router";

const Products = ({ data, setData }) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const router = useRouter();

  const columns = [
    {
      name: <div className="font-bold text-red-500">All Product</div>,
      grow: 2,
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
      grow: 3,
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
                action: a.recommend ? "remove" : "add",
              };

              try {
                await fetchJson("/api/prot/post", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                });

                const index = data.findIndex((object) => {
                  return object.key === a.key;
                });

                if (index !== -1) {
                  data[index].recommend = !a.recommend;
                }
              } catch (error) {
                console.log("error", error);
                if (error instanceof FetchError) {
                  globalAct.setErrorMsg(error.data.message);
                } else {
                  globalAct.setErrorMsg("An unexpected error happened");
                }
              }

              globalAct.setModal(
                a.recommend ? "deleteRekomen" : "addedRekomen"
              );
              globalAct.setIsFetch(false);
              router.replace("/dashboardSKI/produkRekomen");
            }}
            className={`${
              !a.recommend
                ? "bg-green-500/30 items-center justify-center h-8 w-8 rounded-md flex gap-x-2 text-xs text-green-500 hover:w-24 duration-150 hover:before:content-['Add'] border border-green-300"
                : "bg-red-500/30 items-center justify-center h-8 w-8 rounded-md flex gap-x-2 text-xs text-red-500 hover:w-24 duration-150 hover:before:content-['Remove'] border border-red-300"
            }`}
          >
            {a.recommend ? (
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
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd"
                />
              </svg>
            )}
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
          data={data}
          responsive={true}
          highlightOnHover={true}
          pagination
        />
      </div>
    </div>
  );
};

export default memo(Products);
