import DataTable from "react-data-table-component";
import { GlobalContext } from "context/global";
import { useContext } from "react";

const VoucherTable = ({}) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const data = [
    {
      outlet: "Red White Coffee",
      title: "Voucher 10%",
      expired: "21/6/2022",
      min: "Rp 0",
    },
    {
      outlet: "Black White Coffee",
      title: "Voucher 20%",
      expired: "21/6/2022",
      min: "Rp 10.000",
    },
    {
      outlet: "Blue Green Coffee",
      title: "Voucher 30%",
      expired: "21/6/2022",
      min: "Rp 0",
    },
    {
      outlet: "Red White Coffee",
      title: "Voucher 40%",
      expired: "21/6/2022",
      min: "Rp 80.000",
    },
    {
      outlet: "Blue Green Coffee",
      title: "Voucher 50%",
      expired: "21/6/2022",
      min: "Rp 0",
    },
    {
      outlet: "Red White Coffee",
      title: "Voucher 60%",
      expired: "21/6/2022",
      min: "Rp 100.000",
    },
    {
      outlet: "Blue Green Coffee",
      title: "Voucher 70%",
      expired: "21/6/2022",
      min: "Rp 0",
    },
    {
      outlet: "Black White Coffee",
      title: "Voucher 80%",
      expired: "21/6/2022",
      min: "Rp 30.000",
    },
  ];
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
          <p className="text-xs font-bold">{a.title}</p>
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
          <p className="text-xs font-bold">{a.min}</p>
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
          // title={
          //   <p className="text-red-500 font-bold text-sm bg-red-500/50">
          //     Recomendation List
          //   </p>
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

export default VoucherTable;
