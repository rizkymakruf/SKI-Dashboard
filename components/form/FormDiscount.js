import { useForm } from "react-hook-form";
import { useContext, memo, useCallback, useState } from "react";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";

const FormDiscount = ({
  currentBrand,
  isUpdate,
  setIsUpdate,
  newData,
  setNewData,
  selectedProduct,
  setSelectedProduct,
}) => {
  const {
    reset,
    trigger,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();

  console.log("selected product", selectedProduct);
  console.log("new product", newData);

  const onSubmit = useCallback(async (data) => {
    console.log("disi", data);

    const body = {
      outlet: currentBrand,
      percentage: parseInt(data.persent),
      product: typeof data.product == "string" ? [data.product] : data.product,
      uri: "discount/add",
    };

    console.log(body);

    try {
      await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      reset();
      setNewData([]);
      setSelectedProduct([]);
      router.replace(`/dashboard/discount/${currentBrand}`);
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

  const onUpdate = useCallback(async (data) => {
    console.log("disi", data);

    const body = {
      key: data.key,
      percentage: parseInt(data.persent),
      product: typeof data.product == "string" ? [data.product] : data.product,
      uri: "discount/update",
    };

    console.log(body);

    try {
      await fetchJson("/api/prot/put", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      reset();
      setNewData([]);
      setSelectedProduct([]);
      setIsUpdate(false);
      router.replace(`/dashboard/discount/${currentBrand}`);
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

  return (
    <div className="w-full h-auto">
      <div className="w-full h-full select-none">
        <div className="w-full h-full p-3 backdrop-blur bg-white/30 rounded-md border border-gray-300 shadow-md">
          <div className="w-full h-auto relative mb-4">
            <form
              onSubmit={async function handleSubmit(e) {
                e.preventDefault();
                globalAct.setIsFetch(true);

                const find = {
                  key: globalCtx.selectedData.key,
                  name: "%" + e.currentTarget.name.value + "%",
                  outlet: globalCtx.currentBrand,
                  uri: "product/searchAll",
                };
                console.log(find);
                try {
                  const res = await fetchJson("/api/prot/post", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(find),
                  });
                  console.log("search", res);
                  setNewData(res.data);
                } catch (error) {
                  console.log("error", error);
                  if (error instanceof FetchError) {
                    globalAct.setErrorMsg(error.data.message);
                  } else {
                    globalAct.setErrorMsg("An unexpected error happened");
                  }
                }

                globalAct.setIsFetch(false);
              }}
            >
              <div className="flex gap-2 w-full items-center">
                <input
                  name="name"
                  placeholder="Search..."
                  autoComplete="off"
                  className="placeholder-gray-400 px-2 w-full pr-10 h-10 bg-white outline-none focus:ring-2 duration-500 focus:ring-blue-500 border-2 border-gray-400 rounded-md"
                />
                <button
                  className=" bg-blue-500/30 w-10 h-10 flex items-center justify-center rounded-md  hover:bg-blue-500/50"
                  globalCtx={globalCtx}
                  globalAct={globalAct}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
            <form
              onSubmit={
                isUpdate ? handleSubmit(onUpdate) : handleSubmit(onSubmit)
              }
            >
              <div className="w-full h-auto relative mb-4 p-3">
                <input
                  {...register("key")}
                  value={isUpdate ? globalCtx.selectedData.key : null}
                  className="hidden"
                />
                <div className="flex">
                  {newData.length > 0 ? (
                    <div className=" w-2/3">
                      <div className="mb-1 font-semibold">Daftar Produk</div>
                      <div className="grid grid-cols-2 gap-3">
                        {newData.map((x) => (
                          <label className="flex">
                            <input
                              value={x.key}
                              type="checkbox"
                              name="product"
                              checked={
                                selectedProduct.findIndex(
                                  (a) => a.key === x.key
                                ) !== -1
                              }
                              onClick={async () => {
                                var array = [...selectedProduct];
                                var index = selectedProduct.findIndex(
                                  (a) => a.key === x.key
                                );
                                if (index !== -1) {
                                  array.splice(index, 1);
                                  await setSelectedProduct(array);
                                } else {
                                  await setSelectedProduct([
                                    ...selectedProduct,
                                    x,
                                  ]);
                                }
                              }}
                              className="focus:ring-0 mt-1"
                            />
                            <span className="pl-1">{x.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`${
                        selectedProduct.length !== 0 ? "w-auto" : "w-2/3"
                      } flex justify-center`}
                    >
                      Cari produk untuk ditambah ke list diskon !
                    </div>
                  )}
                  {selectedProduct.length !== 0 && (
                    <div className="w-1/3 rounded-md border border-gray-300 space-y-2">
                      <div className="mb-2 font-semibold pb-2 bg-red-500 rounded-t-md text-white p-2">
                        Produk yang dipilih
                      </div>
                      {selectedProduct.map((x) => (
                        <label className="flex pb-2 relative bg-gray-100 ">
                          <div
                            onClick={async () => {
                              var array = [...selectedProduct];
                              var index = array.indexOf(x);
                              if (index !== -1) {
                                array.splice(index, 1);
                                await setSelectedProduct(array);
                              }
                            }}
                            className="absolute -top-2 right-0  flex justify-center items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-5 w-5 text-red-500/80"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            {...register("product")}
                            value={x.key}
                            type="checkbox"
                            name="product"
                            checked={true}
                            className="focus:ring-0 mt-1 hidden"
                          />
                          <span className="pl-1 pr-8">{x.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm font-bold text-gray-700 py-2">
                JUMLAH DISCOUNT
              </p>
              <input
                name="persent"
                autoComplete="off"
                defaultValue={isUpdate ? globalCtx.selectedData.discount : null}
                className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
                  errors.persent
                    ? "focus:outline-red-500 border-2 border-red-500"
                    : null
                }`}
                placeholder="Nilai persent e.g: 50"
                {...register("persent", {
                  required: {
                    value: true,
                    message: "Jumlah discount harus di isi!",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Format tidak sesuai!",
                  },
                })}
                onKeyUp={() => {
                  trigger("persent");
                }}
              />

              {errors.persent && (
                <p className="text-xs text-red-500 pt-2">
                  {errors.persent.message}
                </p>
              )}
              <div className="w-full h-12 flex justify-end gap-2">
                <button
                  type="submit"
                  onClick={() => setValue("key", globalCtx.selectedData.key)}
                  className="w-full px-6 h-8 mt-4 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
                  // disabled={globalCtx.isFetch ? "disabled" : ""}
                >
                  {isUpdate ? "SIMPAN" : "TAMBAH"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FormDiscount);
