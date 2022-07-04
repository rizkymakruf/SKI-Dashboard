import { useEffect } from "react";

export default function TopBrand({ globalCtx, globalAct, onSubmit }) {
  useEffect(() => {
    // console.log("dkoa", document.querySelector("input[name=category]").value);
  }, []);
  //   console.log("nyah", globalCtx.selectedData.key);
  return (
    <form onSubmit={onSubmit}>
      <div className="w-full flex flex-row justify-between items-center gap-6">
        <div className="space-y-4 p-3 w-full ">
          <p className="text-md font-semibold text-red-500">
            Set position top brand
          </p>
          <input
            name="key"
            defaultValue={globalCtx.selectedData.key}
            type="hidden"
          ></input>
          <select className="w-full rounded-md" name="position">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => globalAct.setModal("")}
          className="px-6 h-8 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
        >
          Save
        </button>
      </div>
    </form>
  );
}
