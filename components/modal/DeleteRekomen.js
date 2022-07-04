import { useContext } from "react";
import { GlobalContext } from "context/global";
const DeleteRekomenModal = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);

  return (
    <div className="bg-white w-full h-auto rounded-md shadow-sm shadow-black">
      <div className="px-3 py-2 w-full flex flex-row justify-between items-center">
        <div>
          <p className="text-md font-semibold">
            Product was removed from list product recomendation !
          </p>
        </div>
        <div className="flex gap-x-4">
          <button
            onClick={() => globalAct.setModal("")}
            className="px-6 h-8 bg-blue-500/30 text-blue-500 border-2 shadow-md hover:bg-blue-500/50 border-blue-300 font-semibold rounded overflow-hidden"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRekomenModal;
