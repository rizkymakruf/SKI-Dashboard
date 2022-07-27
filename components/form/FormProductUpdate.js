import { useState, useEffect, memo, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";

const FormProductUpdate = ({
  myRef,
  globalCtx,
  globalAct,
  onSubmit,
  isFetch,
}) => {
  const [detail, setDetail] = useState(false);
  const [infoLengkap, setInfoLengkap] = useState(false);

  useEffect(() => {
    !detail && setInfoLengkap(false);
  });

  const [imageFile, setImageFile] = useState([]);
  const inputFileImage = useRef(null);

  const upLoad = useCallback((props, ref) => {
    inputFileImage.current.click();
  }, []);

  const resetForm = useCallback((e) => {
    e.preventDefault();
    document.querySelector("form").reset();
    setSlide([]);
    setUpdate([]);
  }, []);

  const {
    reset,
    trigger,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-full h-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-full select-none">
          <div className="w-full h-full p-3 rounded-md">
            <div className="w-full h-auto relative mb-2">
              <p className="text-xs font-bold text-gray-700 pb-1">
                NAMA PRODUCT
              </p>
              <input
                name="name"
                autocomplete="off"
                placeholder="Nama Produk"
                className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
                  errors.name
                    ? "focus:outline-red-500 border-2 border-red-500"
                    : null
                }`}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Nama outlet harus di isi!",
                  },
                })}
                onKeyUp={() => {
                  trigger("name");
                }}
              ></input>

              {errors.name && (
                <p className="text-xs text-red-500 pt-2">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="w-full h-auto relative mb-2">
              <p className="text-xs font-bold text-gray-700 pb-1">
                SUB CATEGORY
              </p>
              <select
                name="subCategory"
                type="text"
                placeholder="Sub Category"
                className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-none ${
                  errors.subCategory
                    ? "focus:border-red-500 border-red-500 focus:ring-0"
                    : null
                }`}
                {...register("subCategory", {
                  required: {
                    value: true,
                    message: "",
                  },
                })}
                onKeyUp={() => {
                  trigger("subCategory");
                }}
              >
                <option>-- Select Sub Category --</option>
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
                    name="price"
                    type="text"
                    placeholder="Harga Barang"
                    className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-none ${
                      errors.price
                        ? "focus:border-red-500 border-red-500 focus:ring-0"
                        : null
                    }`}
                    {...register("price", {
                      required: {
                        value: true,
                        message: "Harga produk harus di isi!",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("price");
                    }}
                  ></input>
                  {errors.price && (
                    <p className="text-xs text-red-500 pt-2">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full flex flex-row gap-x-4">
                <div className="w-full h-auto relative mb-2">
                  <p className="text-xs font-bold text-gray-700 pb-1">STOCK</p>
                  <input
                    name="stock"
                    type="text"
                    placeholder="Stock Barang"
                    className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-none ${
                      errors.stock
                        ? "focus:border-red-500 border-red-500 focus:ring-0"
                        : null
                    }`}
                    {...register("stock", {
                      required: {
                        value: true,
                        message: "Stock produk harus di isi!",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("stock");
                    }}
                  ></input>
                  {errors.stock && (
                    <p className="text-xs text-red-500 pt-2">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full h-auto relative mb-2">
                <p className="text-xs font-bold text-gray-700 pb-1">BERAT</p>
                <input
                  name="weight"
                  type="text"
                  placeholder="Berat"
                  className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-none ${
                    errors.weight
                      ? "focus:border-red-500 border-red-500 focus:ring-0"
                      : null
                  }`}
                  {...register("weight", {
                    required: {
                      value: true,
                      message: "Berat produk harus di isi!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("weight");
                  }}
                ></input>
                {errors.weight && (
                  <p className="text-xs text-red-500 pt-2">
                    {errors.weight.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full h-auto relative mb-2">
              <div className="flex items-center gap-x-2 pb-2">
                <p
                  onClick={() => setInfoLengkap(false)}
                  className={`text-xs  font-bold px-2 py-1 border rounded-md ${
                    infoLengkap
                      ? "text-gray-700 border-gray-500"
                      : "text-orange-700 bg-orange-500/30 border-orange-500"
                  }`}
                >
                  DETAIL
                </p>
                <p
                  onClick={() => setInfoLengkap(true)}
                  className={`text-xs font-bold text-gray-700 px-2 py-1 border rounded-md ${
                    infoLengkap
                      ? "text-orange-700 bg-orange-500/30 border-orange-500"
                      : "text-gray-700 border-gray-500 "
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
                  placeholder="Masukan detail barang"
                  className={`resize-none duration-500 text_area_detail h-40 placeholder-gray-300 form-input rounded-md border border-gray-400 ${
                    !infoLengkap ? "w-full" : "w-4 overflow-hidden opacity-30"
                  }`}
                  disabled={
                    // globalCtx.isFetch ||
                    infoLengkap ? "disabled" : ""
                  }
                  {...register("detail", {
                    required: {
                      value: true,
                      message: "Detail produk harus di isi!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("detail");
                  }}
                />

                {detail ? (
                  <textarea
                    name="info"
                    type="text"
                    className={`resize-none duration-500 text_area_detail h-40 placeholder-gray-300 form-input rounded-md border border-gray-400 ${
                      infoLengkap ? "w-full" : "w-4 overflow-hidden opacity-30"
                    }`}
                    placeholder="Masukan detail barang"
                    disabled={
                      // globalCtx.isFetch ||
                      !infoLengkap ? "disabled" : ""
                    }
                    {...register("info", {
                      required: {
                        value: false,
                        message: "",
                      },
                    })}
                  />
                ) : null}
              </div>
            </div>
            {errors.detail && (
              <p className="text-xs text-red-500 pb-2">
                {errors.detail.message}
              </p>
            )}
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

            {/* input gambar */}
            <p className="text-xs font-bold text-gray-700 pt-3">FOTO PRODUK</p>
            <div className="w-full h-auto bg-white">
              <div className="w-full h-auto relative pt-2">
                <input
                  accept="image/png, image/gif, image/jpeg"
                  type="file"
                  id="fileContract"
                  ref={inputFileImage}
                  style={{ display: "none" }}
                  onChange={(e) => handleImage(e)}
                  // disabled={isFetch ? "disabled" : ""}
                />

                <div className="w-full h-auto relative flex-row gap-2 flex items-center pt-2">
                  <div className="w-full h-32 relative z-0 flex text-gray-700 flex-col justify-center items-center rounded h-passport border-2 border-dashed bg-white backdrop-filter bg-opacity-20 backdrop-blur-lg">
                    {isFetch ? (
                      <svg
                        className="animate-spin h-5 w-5 text-blue-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <>
                        <h3 className="text-gray-700">
                          <i className="fas fa-cloud-download-alt"></i>
                        </h3>

                        <p className="font-light text-xs text-black text-center px-3">
                          Drop here or click here
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-12 flex justify-end pt-5">
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

export default memo(FormProductUpdate);
