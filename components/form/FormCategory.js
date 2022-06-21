import { useEffect } from "react";

export default function FormCategory({ globalCtx, onSubmit }) {
  useEffect(() => {
    console.log("dkoa", document.querySelector("input[name=category]").value);
  }, []);
  return (
    <div className="w-full h-auto">
      <form onSubmit={onSubmit}>
        <div className="w-full h-full select-none">
          <div className="w-full h-full p-3 backdrop-blur bg-white/30 rounded-md border border-gray-300 shadow-md">
            <div className="w-full h-auto relative mb-4">
              <p className="text-sm font-bold text-red-600 mb-2">
                Category Name
              </p>
              <input
                name="category"
                type="text"
                className="placeholder-gray-400 h-10 bg-gray-500/20 form-input mt-1 rounded-md border border-gray-300 w-full focus:ring-2 duration-500 focus:ring-blue-500"
                placeholder="$category"
                disabled={globalCtx.isFetch ? "disabled" : ""}
              />
            </div>
            <div className="w-full h-12 flex justify-between gap-2">
              <div className="w-full h-full flex items-center text-xs text-red-400">
                {globalCtx.errorMsg}
              </div>
              <div className="w-auto h-full flex items-center gap-x-2">
                <button
                  disabled={globalCtx.isFetch ? "disabled" : ""}
                  className="px-6 h-8 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
