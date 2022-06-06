const AddCard = (props) => {
  const { modal } = props.globalCtx;
  const { setModal } = props.globalAct;
  return (
    <div className="w-full flex items-center justify-between border border-gray-300 rounded-md p-3 shadow-md">
      <p className="text-sm font-bold text-red-600 w-full">Add Product</p>

      <button
        onClick={() => setModal("addProduct")}
        className="px-6 h-8 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
      >
        Create
      </button>
    </div>
  );
};

export default AddCard;
