import DataTable from "react-data-table-component";

const LastOrderTable = ({}) => {
  const data = [
    {
      name: "goblok",
    },
    {
      name: "goblok",
    },
    {
      name: "goblok",
    },
  ];
  const columns = [
    {
      name: "Name",
      grow: 2,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1">
          <p className="text-xs">{a.name}</p>
        </div>
      ),
    },
    {
      name: "Wording",
      grow: 3,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1">
          <p className="text-xs">{a.name}</p>
        </div>
      ),
    },
    {
      name: "Image",
      grow: 3,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1">
          <p className="text-xs">anjing</p>
        </div>
      ),
    },
    {
      name: "Action",
      grow: 2,
      cell: (a) => (
        <div className="w-full h-full py-1 flex flex-row gap-1">
          <p className="text-xs">anjing</p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-2/4 h-auto relative border shadow rounded mt-8 mb-6">
      <DataTable
        title="Product List"
        columns={columns}
        data={data}
        responsive={true}
        highlightOnHover={true}
        pagination
      />
    </div>
  );
};

export default LastOrderTable;
