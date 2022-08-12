import { useForm } from "react-hook-form";
import {
  useContext,
  memo,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import { uploadFile } from "lib/imageK";
import Image from "next/image";

const FormProductUpdate = (props) => {
  const [detail, setDetail] = useState(false);
  const [infoLengkap, setInfoLengkap] = useState(false);

  useEffect(() => {
    !detail && setInfoLengkap(false);
  });

  // const [imageFile, setImageFile] = useState("");
  const inputFileImage = useRef(null);

  const upLoad = useCallback(() => {
    inputFileImage.current.click();
  }, []);

  const handleChange = useCallback(async (e) => {
    globalAct.setIsFetch(true);
    const file = e.target.files[0];
    const typeFile = file.type.split("/")[1];
    const a = await uploadFile(file, `product.${typeFile}`, "product");
    console.log("newpict", a);
    globalAct.setSelectedData({ ...globalCtx.selectedData, pict: a.url });
    globalAct.setIsFetch(false);
  });

  const {
    reset,
    trigger,
    isFetch,
    setValue,
    getValues,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    // setImageFile(globalCtx.selectedData?.pict);
    reset();
  }, [globalCtx.selectedData]);

  // console.log("sub", globalCtx.listSubCategory);
  // console.log("shorname", globalCtx.currentBrand);

  console.log("update product :", props.globalCtx.selectedData);

  const onSubmit = useCallback(async (data) => {
    const body = {
      uri: "product/update",
      key: data.key,
      outlet: data.outlet,
      category: data.subCategory,
      name: data.name,
      description: data.description,
      price: parseInt(data.price),
      weight: parseInt(data.weight),
      stock: parseInt(data.stock),
      pict: data.pict,
      add_info: data.add_info,
    };

    console.log("body update product", body);

    try {
      const res = await fetchJson("/api/prot/put", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await reset();
      // await setImageFile("");
      await globalAct.setModal("");
      await router.replace(`/dashboard/product/${data.outlet}`);
    } catch (error) {
      console.log("error", error);
      if (error instanceof FetchError) {
        globalAct.setErrorMsg(error.data.message);
      } else {
        globalAct.setErrorMsg("An unexpected error happened");
      }
    }

    globalAct.setIsFetch(false);
  }, []);

  // useEffect(() => {
  //   globalCtx.modal === "" && setImageFile("");
  // });

  return (
    <div className="w-full h-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-full select-none">
          <div className="w-full h-full p-3 rounded-md grid grid-cols-2 gap-3">
            <div className="w-full">
              <div className="w-full h-auto relative mb-2">
                <input
                  name="key"
                  type="hidden"
                  defaultValue={props.globalCtx.selectedData.key}
                  {...register("key", { required: true })}
                ></input>
                <input
                  name="outlet"
                  type="hidden"
                  defaultValue={globalCtx.currentBrand}
                  {...register("outlet", { required: true })}
                ></input>
                <p className="text-xs font-bold text-gray-700 pb-1">
                  NAMA PRODUCT
                </p>
                <input
                  name="name"
                  autocomplete="off"
                  placeholder={globalCtx.selectedData.name}
                  defaultValue={globalCtx.selectedData.name}
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
                  className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-none ${
                    errors.subCategory
                      ? "focus:border-red-500 border-red-500 focus:ring-0"
                      : null
                  }`}
                  {...register("subCategory", {
                    required: {
                      value: true,
                      message: "Sub kategori harus diisi!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("subCategory");
                  }}
                >
                  {globalCtx.listSubCategory.map((dat, idx) => {
                    return (
                      <option
                        selected={globalCtx.selectedData?.category == dat.key}
                        value={dat.key}
                      >
                        {dat.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-row w-full gap-x-4">
                <div className="w-full flex flex-row gap-x-4">
                  <div className="w-full h-auto relative mb-2">
                    <p className="text-xs font-bold text-gray-700 pb-1">
                      HARGA
                    </p>
                    <input
                      name="price"
                      type="text"
                      autoComplete="off"
                      placeholder={globalCtx.selectedData.price}
                      defaultValue={globalCtx.selectedData.price}
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
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Format tidak sesuai!",
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
                    <p className="text-xs font-bold text-gray-700 pb-1">
                      STOCK
                    </p>
                    <input
                      name="stock"
                      type="text"
                      autoComplete="off"
                      placeholder={globalCtx.selectedData.stock}
                      defaultValue={globalCtx.selectedData.stock}
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
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Format tidak sesuai!",
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
                    autoComplete="off"
                    placeholder={globalCtx.selectedData.weight}
                    defaultValue={globalCtx.selectedData.weight}
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
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "Format tidak sesuai!",
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
                </div>
                <div className="flex justify-center">
                  <textarea
                    // disabled
                    name="description"
                    type="text"
                    placeholder={globalCtx.selectedData.description}
                    defaultValue={globalCtx.selectedData.description}
                    className={`resize-none duration-500 text_area_detail h-40 placeholder-gray-300 form-input rounded-md border border-gray-400 ${
                      !infoLengkap ? "w-full" : "w-4 overflow-hidden opacity-30"
                    }`}
                    disabled={
                      // globalCtx.isFetch ||
                      infoLengkap ? "disabled" : ""
                    }
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Detail produk harus di isi!",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("description");
                    }}
                  />

                  {detail ? (
                    <textarea
                      name="add_info"
                      type="text"
                      defaultValue={globalCtx.selectedData.add_info}
                      className={`resize-none duration-500 text_area_detail h-40 placeholder-gray-300 form-input rounded-md border border-gray-400 ${
                        infoLengkap
                          ? "w-full"
                          : "w-4 overflow-hidden opacity-30"
                      }`}
                      placeholder={globalCtx.selectedData.add_info}
                      disabled={
                        // globalCtx.isFetch ||
                        !infoLengkap ? "disabled" : ""
                      }
                      {...register("add_info", {
                        required: {
                          value: false,
                          message: "",
                        },
                      })}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="w-full">
              {errors.description && (
                <p className="text-xs text-red-500 pb-2">
                  {errors.description.message}
                </p>
              )}

              {/* input gambar */}
              <p className="text-xs font-bold text-gray-700 pt-3">
                FOTO PRODUK
              </p>
              <div className="w-full">
                <div className="w-full h-auto relative pt-2">
                  <input
                    accept="image/png, image/gif, image/jpeg"
                    type="file"
                    ref={inputFileImage}
                    style={{ display: "none" }}
                    onChange={(e) => handleChange(e)}
                    disabled={isFetch ? "disabled" : ""}
                  />

                  <div className="w-full h-auto relative flex-row gap-2 flex items-center  pt-2">
                    <div
                      onClick={upLoad}
                      className="w-full h-40 relative z-0 flex text-gray-700 flex-col justify-center items-center rounded h-passport border-2 border-dashed bg-white backdrop-filter bg-opacity-20 backdrop-blur-lg"
                    >
                      <div className="w-36 h-36 relative z-40 flex justify-center items-center">
                        {globalCtx.selectedData?.pict === "" &&
                        globalCtx.isFetch ? (
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
                        ) : globalCtx.selectedData?.pict === "" &&
                          !globalCtx.isFetch ? (
                          <>
                            <h3 className="text-gray-700">
                              <i className="fas fa-cloud-download-alt"></i>
                            </h3>

                            <p className="font-light text-xs text-black text-center px-3">
                              Drop here or click here
                            </p>
                          </>
                        ) : (
                          <Image
                            layout="fill"
                            src={globalCtx.selectedData?.pict}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">
                    *Format picture recomand 1x1
                  </span>
                  <div className="w-full h-auto relative px-4 py-3 flex justify-end gap-1">
                    <div className="w-full h-auto flex justify-end gap-2">
                      <button
                        type="submit"
                        onClick={() => {
                          setValue("key", globalCtx.selectedData.key),
                            setValue("pict", globalCtx.selectedData.pict);
                        }}
                        disabled={globalCtx.isFetch ? "disabled" : ""}
                        className="px-6 h-8 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default memo(FormProductUpdate);
