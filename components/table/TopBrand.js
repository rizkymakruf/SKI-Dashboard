import DataTable from "react-data-table-component";
import { GlobalContext } from "context/global";
import { useContext, memo, useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingMini from "components/card/LoadingMini";

const TopBrandTable = (props) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const router = useRouter();
  const data = props.tbrand;

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
          progressPending={pending}
          progressComponent={<LoadingMini />}
        />
      </div>
    </div>
  );
};

export default memo(TopBrandTable);
