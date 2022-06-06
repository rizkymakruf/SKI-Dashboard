import FormProduct from "components/form/FormProduct";
import { useContext } from "react";
import { GlobalContext } from "context/global";
const UserOrderModal = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);

  return (
    <div className="bg-white w-full h-auto rounded-md shadow-sm shadow-black">
      <div className="bg-red-500 h-12 w-full flex items-center justify-between px-3">
        <p className="text-white font-bold">Order Info</p>
        <button
          onClick={() => globalAct.setModal("")}
          className={
            "bg-white items-center justify-center h-8 w-8 rounded-md shadow-md flex gap-x-2 text-xs text-red-500 hover:w-24 duration-150 hover:after:content-['Back']"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="p-3 w-full flex flex-col gap-y-2">
        <div className="flex items-center flex-row gap-x-2">
          <div className="bg-black w-20 h-20 rounded-full" />
          <div>
            <p className="text-md font-semibold">Karina Salim</p>
          </div>
        </div>
        <div className="border-2 rounded-md p-2">
          <div>
            <p className="text-sm">Items</p>
            <p>____________</p>
          </div>
          <div>
            <p className="text-sm">Destination</p>
            <p>____________</p>
          </div>
        </div>
        <div className="border-2 rounded-md p-2">
          <div>
            <p className="text-sm">Payment Method</p>
            <p>____________</p>
          </div>
          <div>
            <p className="text-sm">Payment Code</p>
            <p>____________</p>
          </div>
          <div>
            <p className="text-sm">Status</p>
            <p>____________</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderModal;
