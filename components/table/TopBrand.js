import DataTable from "react-data-table-component";
import { GlobalContext } from "context/global";
import { useContext } from "react";
import { useRouter } from "next/router";

const TopBrandTable = (props) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const router = useRouter();
  const data = props.tbrand;

  const columns = [
    {
      name: <div className="font-bold text-red-500">Brand Name</div>,
      grow: 10,
      cell: (a) => (
        <div className="w-full h-full py-1 flex items-center flex-row gap-1">
          <p className="text-xs font-bold">{a.name}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-auto relative ">
      <div className=" py-3">
        <p className="text-orange-500 font-bold text-md">Top Brand</p>
      </div>
      <div className="border-2 rounded-md">
        <DataTable
          columns={columns}
          data={data}
          responsive={true}
          highlightOnHover={true}
          // pagination
        />
      </div>
    </div>
  );
};

export default TopBrandTable;
