// import DataTable from "react-data-table-component";
// import Image from "next/image";

// const DataOdp = ({ room, actionButton }) => {
//   const data = room;
//   const columns = [
//     {
//       name: "Name",
//       grow: 2,
//       cell: "2"
//     },
//     {
//       name: "Wording",
//       grow: 3,
//       cell: "3"
//     },
//     {
//       name: "Image",
//       grow: 3,
//       cell: "3"
//     },
//     {
//       name: "Action",
//       grow: 2,
//       cell: "2"
//     },
//   ];

//   const ExpandedComponent = ({ data }) => (
//     <pre>{JSON.stringify(data, null, 2)}</pre>
//   );

//   return (
//     <div className="w-full h-auto relative border shadow rounded mt-8 mb-6">
//       <DataTable
//         title="Room List"
//         columns={columns}
//         data={data}
//         responsive={true}
//         highlightOnHover={true}
//         // expandableRows
//         // expandableRowsComponent={ExpandedComponent}
//         pagination
//       />
//     </div>
//   );
// };

// export default DataOdp;
