import DataTable from "react-data-table-component";
import { GlobalContext } from "context/global";
import { useContext, memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useForm } from "react-hook-form";
import Loading from "components/card/Loading";

const ContentTable = ({
  data,
  reset,
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
      name: <div className="font-bold text-red-500">Title</div>,
      grow: 10,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1 items-center">
          <p className="text-xs font-bold">{a.title}</p>
        </div>
      ),
    },
    {
      name: (
        <div className="w-full text-center font-bold text-red-500">Active</div>
      ),
      grow: 2,
      cell: (a) => (
        <div className="flex flex-row items-center justify-center gap-x-2 w-full">
          <label className="switch">
            <input
              type="checkbox"
              checked={a.active}
              globalCtx={globalCtx}
              globalAct={globalAct}
              onClick={async function handleSubmit(e) {
                e.preventDefault();
                globalAct.setIsFetch(true);
                // globalAct.setSelectedData(a);

                const body = {
                  uri: "content/status",
                  key: a.key,
                  active: !a.active,
                };

                console.log(body);

                try {
                  await fetchJson("/api/prot/patch", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                  });
                  router.replace("/dashboardSKI/content");
                } catch (error) {
                  console.log("error", error);
                  if (error instanceof FetchError) {
                    globalAct.setErrorMsg(error.data.message);
                  } else {
                    globalAct.setErrorMsg("An unexpected error happened");
                  }
                }
                globalAct.setModal("");
                globalAct.setIsFetch(false);
              }}
            />
            <span className="slider round"></span>
          </label>
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
              globalAct.setModal("detailContent");
              globalAct.setSelectedData({
                ...globalCtx.selectedData,
                active: a.active,
                created_at: a.created_at,
                description: a.description,
                key: a.key,
                label: a.label,
                pict: a.pict,
                title: a.title,
                type: a.type,
              });
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
            onClick={() => {
              globalAct.setModal("editContent");
              globalAct.setSelectedData({
                ...globalCtx.selectedData,
                active: a.active,
                created_at: a.created_at,
                description: a.description,
                key: a.key,
                label: a.label,
                pict: a.pict,
                title: a.title,
                type: a.type,
              });
            }}
            className={
              "bg-blue-500/30 items-center justify-center h-8 w-8 rounded-md hover:bg-blue-500/50 shadow-md flex gap-x-2 text-xs text-blue-500 hover:w-24 duration-150 hover:before:content-['Edit'] border border-blue-300"
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

export default memo(ContentTable);
