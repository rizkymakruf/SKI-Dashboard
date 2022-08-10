import { useForm } from "react-hook-form";
import { useContext, memo, useCallback, useState, useEffect } from "react";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";

const FormDiscount = ({ listProduct }) => {
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
  const [newData, setNewData] = useState(listProduct);
  const [product, setProduct] = useState([]);
  let a;
  useEffect(() => {
    console.log(product);
    a = product;
  }, [product]);

  const onSubmit = useCallback(async (data) => {
    console.log("disi", data);

    const body = {
      key: data.key,
      name: product,
      uri: "category/update",
    };
    console.log("body", body);

    // try {
    //   await fetchJson("/api/prot/patch", {
    //     method: "PATCH",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(body),
    //   });

    //   router.replace("/dashboardSKI/category");
    //   globalAct.setModal("");
    //   reset();
    // } catch (error) {
    //   console.log("error", error);
    //   if (error instanceof FetchError) {
    //     globalAct.setErrorMsg(error.data.message);
    //   } else {
    //     globalAct.setErrorMsg("An unexpected error happened");
    //   }
    // }
    // globalAct.setIsFetch(false);
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
                  name: "%" + e.currentTarget.name.value + "%",
                  outlet: globalCtx.currentBrand,
                  uri: "product/searchAll",
                };
                console.log(find);
                const check = e.currentTarget.name.value !== "" ? true : false;
                try {
                  const res = await fetchJson("/api/prot/post", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(find),
                  });
                  console.log("search", res);
                  if (!check) {
                    setNewData(listProduct);
                  } else {
                    setNewData(res.data);
                  }
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full h-auto relative my-2">
                <p className="text-sm font-bold text-gray-700">PILIH PRODUK</p>
              </div>
              <div className="w-full h-auto relative mb-4 p-1">
                <div className="grid grid-cols-3 gap-3">
                  {newData.map((x) => (
                    <label className="flex">
                      <input
                        value={x.key}
                        type="checkbox"
                        onClick={(e) =>
                          // a.push(e.currentTarget.value)
                          setProduct([...product, e.currentTarget.value])
                        }
                        className="focus:ring-0 mt-1"
                      />
                      <span className="pl-1">{x.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <p className="text-sm font-bold text-gray-700 py-2">
                JUMLAH DISCOUNT
              </p>
              <input
                name="persent"
                autoComplete="off"
                className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
                  errors.persent
                    ? "focus:outline-red-500 border-2 border-red-500"
                    : null
                }`}
                placeholder="Nilai persent (50%)"
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
                  // onClick={() => setValue("key", globalCtx.selectedData.key)}
                  className="w-full px-6 h-8 mt-4 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
                  // disabled={globalCtx.isFetch ? "disabled" : ""}
                >
                  TAMBAH
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
