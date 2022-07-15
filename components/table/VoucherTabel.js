import DataTable from "react-data-table-component";
import { GlobalContext } from "context/global";
import { useContext, memo } from "react";

const VoucherTable = ({}) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const data = [
    {
      name: "DISCOUNT 99%",
      val: "99%",
      min: "Rp 25.000",
      start: "1/8/2022",
      end: "2/9/2022",
    },
    {
      name: "DISCOUNT 50%",
      val: "50%",
      min: "Rp 10.000",
      start: "17/8/2022",
      end: "18/8/2022",
    },
    {
      name: "DISCOUNT 10%",
      val: "10%",
      min: "Rp 0.0",
      start: "30/7/2022",
      end: "1/8/2022",
    },
    {
      name: "DISCOUNT 99%",
      val: "99%",
      min: "Rp 25.000",
      start: "1/8/2022",
      end: "2/9/2022",
    },
    {
      name: "DISCOUNT 50%",
      val: "50%",
      min: "Rp 10.000",
      start: "17/8/2022",
      end: "18/8/2022",
    },
    {
      name: "DISCOUNT 10%",
      val: "10%",
      min: "Rp 0.0",
      start: "30/7/2022",
      end: "1/8/2022",
    },
    {
      name: "DISCOUNT 99%",
      val: "99%",
      min: "Rp 25.000",
      start: "1/8/2022",
      end: "2/9/2022",
    },
    {
      name: "DISCOUNT 50%",
      val: "50%",
      min: "Rp 10.000",
      start: "17/8/2022",
      end: "18/8/2022",
    },
    {
      name: "DISCOUNT 10%",
      val: "10%",
      min: "Rp 0.0",
      start: "30/7/2022",
      end: "1/8/2022",
    },
    {
      name: "DISCOUNT 99%",
      val: "99%",
      min: "Rp 25.000",
      start: "1/8/2022",
      end: "2/9/2022",
    },
    {
      name: "DISCOUNT 50%",
      val: "50%",
      min: "Rp 10.000",
      start: "17/8/2022",
      end: "18/8/2022",
    },
    {
      name: "DISCOUNT 10%",
      val: "10%",
      min: "Rp 0.0",
      start: "30/7/2022",
      end: "1/8/2022",
    },
  ];
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
          <p className="text-xs font-bold">{a.min}</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Persent</div>,
      grow: 1,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1 items-center">
          <p className="text-xs font-bold">{a.val}</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Mulai</div>,
      grow: 1,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1 items-center">
          <p className="text-xs font-bold">{a.start}</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Berakhir</div>,
      grow: 1,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1 items-center">
          <p className="text-xs font-bold">{a.end}</p>
        </div>
      ),
    },
    {
      name: (
        <div className="w-full text-center font-bold text-red-500">Active</div>
      ),
      grow: 1,
      cell: (a) => (
        <div className="flex justify-center gap-x-2 w-full">
          <label className="switch">
            <input
              type="checkbox"
              checked={a.active}
              globalCtx={globalCtx}
              globalAct={globalAct}
              // onClick={async function handleSubmit(e) {
              //   e.preventDefault();
              //   globalAct.setIsFetch(true);
              //   globalAct.setSelectedData(a);

              //   const body = {
              //     uri: "user/status",
              //     key: a.key,
              //     active: !a.active,
              //   };

              //   try {
              //     await fetchJson("/api/prot/patch", {
              //       method: "PATCH",
              //       headers: { "Content-Type": "application/json" },
              //       body: JSON.stringify(body),
              //     });
              //     router.reload("/dashboardSKI/admins");
              //   } catch (error) {
              //     console.log("error", error);
              //     if (error instanceof FetchError) {
              //       globalAct.setErrorMsg(error.data.message);
              //     } else {
              //       globalAct.setErrorMsg("An unexpected error happened");
              //     }
              //   }
              // }}
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
      />
    </div>
  );
};

export default memo(VoucherTable);
