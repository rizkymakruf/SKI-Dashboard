import DataTable from "react-data-table-component";
import { GlobalContext } from "context/global";
import { useContext } from "react";

const OrderTable = ({}) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const data = [
    {
      order_by: "Fandy",
      tujuan:
        "Gng eekasd damwkd widwdia iaiaaaaaaaaaaaaaaaaaaaaa aksmddw dwdiaid0000m d aksmddw dwdiaid0000m daksmddw dwdiaid0000m",
      status: "SUCCESS",
    },
    {
      order_by: "Wiliam",
      tujuan: "Jln rusa no.44",
      status: "PENDING",
    },
    {
      order_by: "Agus",
      tujuan: "Jln ikan no.34",
      status: "EXPIRED",
    },
    {
      order_by: "Made",
      tujuan: "Jln burung no.34",
      status: "PENDING",
    },
    {
      order_by: "Rizky",
      tujuan: "Jln kaki no.34",
      status: "PENDING",
    },
    {
      order_by: "Fandy",
      tujuan: "Gng eek",
      status: "SUCCESS",
    },
    {
      order_by: "Wiliam",
      tujuan: "Jln rusa no.44",
      status: "PENDING",
    },
    {
      order_by: "Agus",
      tujuan: "Jln ikan no.34",
      status: "EXPIRED",
    },
    {
      order_by: "Made",
      tujuan: "Jln burung no.34",
      status: "PENDING",
    },
    {
      order_by: "Rizky",
      tujuan: "Jln kaki no.34",
      status: "PENDING",
    },
    {
      order_by: "Fandy",
      tujuan: "Gng eek",
      status: "SUCCESS",
    },
    {
      order_by: "Wiliam",
      tujuan: "Jln rusa no.44",
      status: "PENDING",
    },
    {
      order_by: "Agus",
      tujuan: "Jln ikan no.34",
      status: "EXPIRED",
    },
    {
      order_by: "Made",
      tujuan: "Jln burung no.34",
      status: "PENDING",
    },
    {
      order_by: "Rizky",
      tujuan: "Jln kaki no.34",
      status: "PENDING",
    },
  ];
  const columns = [
    {
      name: <div className="font-bold text-red-500">User Order</div>,
      grow: 2,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1 items-center">
          <p className="text-xs font-bold">{a.order_by}</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Destinasi Order</div>,
      grow: 4,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1 items-center">
          <p className="text-xs font-bold">{a.tujuan}</p>
        </div>
      ),
    },
    {
      name: <div className="font-bold text-red-500">Status</div>,
      grow: 1,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1 items-center">
          <p
            className={`text-xs font-bold px-2 shadow-md py-1 rounded-xl ${
              a.status === "PENDING"
                ? "bg-yellow-500/30 text-yellow-500"
                : a.status === "EXPIRED"
                ? "bg-red-500/30 text-red-500"
                : a.status == "SUCCESS" && "bg-green-500/30 text-green-500"
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
            onClick={() => globalAct.setModal("userOrder")}
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
      />
    </div>
  );
};

export default OrderTable;
