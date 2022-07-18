import { useState, memo } from "react";

const FormHistory = ({ myRef, globalCtx, globalAct, onSubmit }) => {
  const [formType, setFormType] = useState(false);
  return (
    <div className="w-full h-auto">
      <form onSubmit={onSubmit}>
        <div className="w-full h-full select-none">
          <div className="w-full h-full p-3 backdrop-blur bg-white/50 shadow-md rounded-md border space-y-2">
            <p className="text-sm font-extrabold text-red-500 pb-2">
              Filter Tanggal
            </p>
            <div className="w-full h-auto relative">
              <p className="text-sm font-extrabold">Dari</p>
              <input
                name="dari"
                type="date"
                className="placeholder-gray-300 form-input mt-1 rounded-md border w-full border-gray-300"
                placeholder="Username"
                disabled={globalCtx.isFetch ? "disabled" : ""}
              />
            </div>
            <div className="w-full h-auto relative">
              <p className="text-sm font-extrabold">Sampai</p>
              <input
                name="sampai"
                type="date"
                className="placeholder-gray-300 form-input mt-1 rounded-md border w-full border-gray-300"
                placeholder="Password"
                disabled={globalCtx.isFetch ? "disabled" : ""}
              />
            </div>

            <div className="w-full">
              <button
                disabled={globalCtx.isFetch ? "disabled" : ""}
                className="w-full h-10 bg-green-500 border-2 border-green-700 text-white hover:bg-green-300 hover:text-green-700  font-semibold rounded overflow-hidden"
              >
                FILTER HISTORY
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default memo(FormHistory);
