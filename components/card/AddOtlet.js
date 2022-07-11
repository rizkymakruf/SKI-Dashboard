import { memo } from "react";

const AddOtlet = (props) => {
  const { modal } = props.globalCtx;
  const { setModal } = props.globalAct;
  return (
    <>
      <div className="w-full flex justify-between items-center border border-gray-200 shadow-md p-3 rounded-md">
        <p className="text-md font-semibold text-red-500">Create Outlet</p>
        <button
          className={
            "bg-green-500/30 items-center justify-center h-10 w-10 rounded-md hover:bg-red-orange/50 shadow-sm flex gap-x-2 text-md border border-green-500 font-semibold text-green-500 hover:w-28 duration-150 hover:after:content-['Create'] "
          }
          onClick={() => setModal("addOtlet")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default memo(AddOtlet);
