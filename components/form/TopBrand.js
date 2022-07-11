import { memo } from "react";

const TopBrand = ({ globalCtx, globalAct, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="w-full flex-row justify-between items-center gap-6">
        <div className="bg-red-500 rounded-t-md py-3 px-4">
          <p className="text-md font-semibold text-white">
            Set position top brand
          </p>
        </div>
        <div className="space-y-4 p-3 w-full bg-white rounded-b-md">
          <input
            name="key"
            defaultValue={globalCtx.selectedData.key}
            type="hidden"
          ></input>
          <select
            className="rounded-md p-2 border-2  border-orange-500/50 w-full "
            name="position"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => globalAct.setModal("")}
              className="px-6 h-8 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default memo(TopBrand);
