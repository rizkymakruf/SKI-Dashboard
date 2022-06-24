import Link from "next/link";

const DashboardCardSKI = (props) => {
  const { modal } = props.globalCtx;
  const { setModal } = props.globalAct;
  const { setSelectedData } = props.globalAct;
  return (
    <>
      <div className="duration-500 bg-white border-orange-300 border-2 shadow-md w-full h-44 rounded-md p-4 flex flex-col justify-between hover:shadow-red-500 hover:scale-95">
        <div>
          <p className="font-bold text-gray-800 pb-2">{props.otlet.name}</p>
          <hr />
          <div className="flex items-center gap-x-2 pt-2">
            <span className="text-red-500 font-bold text-sm">
              {props.otlet.orders}
            </span>
            <span className="text-gray-600 font-semibold text-sm">Orders</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-red-500 font-bold text-sm">
              {props.otlet.products}
            </span>
            <span className="text-gray-600 font-semibold text-sm">
              Products
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-red-500 font-bold text-sm">
              {props.otlet.sub_categories}
            </span>
            <span className="text-gray-600 font-semibold text-sm">
              Sub Category
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <label className="switch">
            <input
            // type="checkbox"
            // value={moreDay}
            // onClick={() => {
            //   setMoreDay(!moreDay);
            //   setInputValue({ ...inputValue, sampai: "" });
            // }}
            // onChange={(e) => setMoreDay(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>

          <div className="flex gap-2">
            <Link href={props.otlet.key}>
              <button
                className={
                  "bg-blue-500/30 items-center justify-center h-8 w-8 rounded-md hover:bg-red-orange/50 shadow-md flex gap-x-2 text-xs text-blue-500 hover:w-24 duration-150 hover:after:content-['Manage'] "
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </Link>

            {/* btn update  */}
            <button
              onClick={() => {
                setModal("editOtlet");
                props.globalAct.setSelectedData(props.otlet);
              }}
              className={
                "bg-orange-500/30 items-center justify-center h-8 w-8 rounded-md hover:bg-red-orange/50 shadow-md flex gap-x-2 text-xs text-orange-500 hover:w-24 duration-150 hover:after:content-['Update'] "
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCardSKI;
