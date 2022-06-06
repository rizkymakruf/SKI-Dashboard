import { useState } from "react";

export default function FormHistory({ myRef, globalCtx, globalAct, onSubmit }) {
  const [formType, setFormType] = useState(false);
  return (
    <div className="w-full h-auto">
      <form onSubmit={onSubmit}>
        <div className="w-full h-full select-none">
          <div className="w-full h-full p-3 backdrop-blur bg-white/50 shadow-md rounded-md border">
            <p className="text-sm font-extrabold text-red-500 pb-2">
              Filter Tanggal
            </p>
            <div className="w-full h-auto relative mb-4">
              <p className="text-sm font-extrabold">Dari</p>
              <input
                name="dari"
                type="date"
                className="placeholder-gray-300 form-input mt-1 rounded-md border w-full border-gray-300"
                placeholder="Username"
                disabled={globalCtx.isFetch ? "disabled" : ""}
              />
            </div>
            <div className="w-full h-auto relative mb-4">
              <p className="text-sm font-extrabold">Sampai</p>
              <input
                name="sampai"
                type="date"
                className="placeholder-gray-300 form-input mt-1 rounded-md border w-full border-gray-300"
                placeholder="Password"
                disabled={globalCtx.isFetch ? "disabled" : ""}
              />
            </div>

            <div className="w-full h-12 flex justify-between gap-2">
              <div className="w-full h-full flex items-center text-xs text-red-400">
                {globalCtx.errorMsg}
              </div>
              <div className="w-72 h-full flex items-center">
                <button
                  disabled={globalCtx.isFetch ? "disabled" : ""}
                  className="px-8 h-10 bg-gray-50 border-2 border-gray-300 rounded overflow-hidden"
                >
                  Fetch out!
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
