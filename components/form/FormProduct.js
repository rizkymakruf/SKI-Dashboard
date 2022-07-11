import { useState, useEffect, memo } from "react";

const FormProduct = ({ myRef, globalCtx, globalAct, onSubmit }) => {
  const [detail, setDetail] = useState(false);
  const [infoLengkap, setInfoLengkap] = useState(false);

  useEffect(() => {
    !detail && setInfoLengkap(false);
  });

  return (
    <div className="w-full h-auto">
      <form onSubmit={onSubmit}>
        <div className="w-full h-full select-none">
          <div className="w-full h-full p-3 rounded-md">
            <div className="w-full h-auto relative mb-2">
              <p className="text-xs font-bold text-gray-700 pb-1">
                PRODUCT NAME
              </p>
              <input
                name="username"
                type="text"
                className="placeholder-gray-300 h-10 form-input mt-1 rounded-md border border-gray-400 w-full"
                placeholder="Username"
                disabled={globalCtx.isFetch ? "disabled" : ""}
              />
            </div>
            <div className="w-full h-auto relative mb-2">
              <p className="text-xs font-bold text-gray-700 pb-1">CATEGORY</p>
              <select
                name="password"
                type="text"
                className="placeholder-gray-300 h-10 form-input mt-1 rounded-md border border-gray-400 w-full"
                placeholder="Password"
                disabled={globalCtx.isFetch ? "disabled" : ""}
              >
                <option>-- Select Category --</option>
                <option>Coffee Biji</option>
                <option>Machine</option>
                <option>Bijikerst</option>
              </select>
            </div>
            <div className="flex flex-row w-full gap-x-4">
              <div className="w-full flex flex-row gap-x-4">
                <div className="w-full h-auto relative mb-2">
                  <p className="text-xs font-bold text-gray-700 pb-1">
                    HARGA PRODUKSI
                  </p>
                  <input
                    name="product-price"
                    type="text"
                    className="placeholder-gray-300 h-10 form-input mt-1 rounded-md border border-gray-400 w-full"
                    placeholder="Harga Barang"
                    disabled={globalCtx.isFetch ? "disabled" : ""}
                  />
                </div>
              </div>
              <div className="w-full h-auto relative mb-2">
                <p className="text-xs font-bold text-gray-700 pb-1">HARGA</p>
                <input
                  name="stock"
                  type="text"
                  className="placeholder-gray-300 h-10 form-input mt-1 rounded-md border border-gray-400 w-full"
                  placeholder="Stock"
                  disabled={globalCtx.isFetch ? "disabled" : ""}
                />
              </div>
              <div className="w-full flex flex-row gap-x-4">
                <div className="w-full h-auto relative mb-2">
                  <p className="text-xs font-bold text-gray-700 pb-1">STOCK</p>
                  <input
                    name="product-price"
                    type="text"
                    className="placeholder-gray-300 h-10 form-input mt-1 rounded-md border border-gray-400 w-full"
                    placeholder="Harga Barang"
                    disabled={globalCtx.isFetch ? "disabled" : ""}
                  />
                </div>
              </div>
              <div className="w-full h-auto relative mb-2">
                <p className="text-xs font-bold text-gray-700 pb-1">BERAT</p>
                <input
                  name="stock"
                  type="text"
                  className="placeholder-gray-300 h-10 form-input mt-1 rounded-md border border-gray-400 w-full"
                  placeholder="Stock"
                  disabled={globalCtx.isFetch ? "disabled" : ""}
                />
              </div>
            </div>
            <div className="w-full h-auto relative mb-2">
              <div className="flex items-center gap-x-2 pb-2">
                <p
                  onClick={() => setInfoLengkap(false)}
                  className={`text-xs  font-bold px-2 py-1 border rounded-md border-gray-500 ${
                    infoLengkap
                      ? "text-gray-700"
                      : "text-orange-700 bg-orange-500/30 border-orange-500"
                  }`}
                >
                  DETAIL
                </p>
                <p
                  onClick={() => setInfoLengkap(true)}
                  className={`text-xs font-bold text-gray-700 px-2 py-1 border rounded-md border-gray-500 ${
                    infoLengkap
                      ? "text-orange-700 bg-orange-500/30 border-orange-500"
                      : "text-gray-700"
                  } ${detail ? "" : "hidden"}`}
                >
                  INFO LENGKAP
                </p>
              </div>
              <div className="flex justify-center">
                <textarea
                  // disabled
                  name="detail"
                  type="text"
                  className={`resize-none duration-500 text_area_detail h-40 placeholder-gray-300 form-input rounded-md border border-gray-400 ${
                    !infoLengkap ? "w-full" : "w-4 overflow-hidden opacity-30"
                  }`}
                  placeholder="Masukan detail barang"
                  disabled={
                    // globalCtx.isFetch ||
                    infoLengkap ? "disabled" : ""
                  }
                />
                {detail ? (
                  <textarea
                    name="detail"
                    type="text"
                    className={`resize-none duration-150 text_area_detail h-40 placeholder-gray-300 form-input rounded-md border border-gray-400 ${
                      infoLengkap ? "w-full" : "w-4 overflow-hidden opacity-30"
                    }`}
                    placeholder="Masukan detail barang"
                    disabled={
                      // globalCtx.isFetch ||
                      !infoLengkap ? "disabled" : ""
                    }
                  />
                ) : null}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <label className="switch">
                <input
                  type="checkbox"
                  onClick={() => {
                    setDetail(!detail);
                  }}
                />
                <span className="slider round"></span>
              </label>
              <p className="text-xs font-semibold">
                Apakah berisini info lengkap ?
              </p>
            </div>
            <div className="w-full h-12 flex justify-between">
              <div className="w-full h-full flex items-center text-xs text-red-400">
                {globalCtx.errorMsg}
              </div>
              <div className="w-auto h-full flex items-center">
                <button
                  disabled
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
};

export default memo(FormProduct);
