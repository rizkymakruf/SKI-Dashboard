import DataTable from "react-data-table-component";
import { GlobalContext } from "context/global";
import { useContext } from "react";

const ProdukRekomenTable = ({}) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const data = [
    {
      title: "Coffee satu",
    },
    {
      title: "Coffee dua",
    },
    {
      title: "Coffee tiga",
    },
    {
      title: "Coffee empat",
    },
    {
      title: "Coffee lima",
    },
    {
      title: "Coffee dua",
    },
    {
      title: "Coffee tiga",
    },
    {
      title: "Coffee empat",
    },
    {
      title: "Coffee lima",
    },
    {
      title: "Coffee dua",
    },
    {
      title: "Coffee tiga",
    },
    {
      title: "Coffee empat",
    },
    {
      title: "Coffee lima",
    },
  ];
  const columns = [
    {
      name: <div className="font-bold text-red-500">Product Recomendation</div>,
      grow: 2,
      cell: (a) => (
        <div className="w-full h-full py-1 flex items-center flex-row gap-1">
          <p className="text-xs font-bold">{a.title}</p>
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
            onClick={() => globalAct.setModal("deleteRekomen")}
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
        />
      </div>
    </div>
  );
};

export default ProdukRekomenTable;
