import { useForm } from "react-hook-form";
import { useContext, memo, useCallback } from "react";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";

const FormVOucher = () => {
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

  const onSubmit = useCallback(async (data) => {
    console.log("disi", data);

    const startDate = new Date(data.start);
    const endDate = new Date(data.end);

    const body = {
      name: data.name,
      uri: "voucher/add",
      outlet: data.outlet,
      percentage: parseInt(data.persent),
      min: parseInt(data.min),
      started: startDate / 1000,
      expired: endDate / 1000,
    };

    console.log("add voucher", body);

    try {
      await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      reset();
      globalAct.setModal("");
      await router.replace(`/dashboard/voucher/${globalCtx.currentBrand}`);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-full select-none">
          <div className="w-full h-full p-3 backdrop-blur bg-white/30 rounded-md border border-gray-300 shadow-md">
            <div className="w-full h-auto relative mb-4">
              <input
                name="outlet"
                type="hidden"
                defaultValue={globalCtx.currentBrand}
                {...register("outlet", { required: true })}
              ></input>
              <p className="text-xs font-bold text-gray-700 pb-1">
                NAMA VOUCHER
              </p>
              <input
                name="name"
                autoComplete="off"
                className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
                  errors.name
                    ? "focus:outline-red-500 border-2 border-red-500"
                    : null
                }`}
                placeholder="Nama voucher"
                {...register("name", {
                  minLength: {
                    value: 3,
                    message: "Nama voucher minimal 3 karakter!",
                  },
                  required: {
                    value: true,
                    message: "Nama voucher harus di isi!",
                  },
                })}
                onKeyUp={() => {
                  trigger("name");
                }}
              />

              {errors.name && (
                <p className="text-xs text-red-500 pt-2">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="w-full h-auto relative mb-4">
              <p className="text-xs font-bold text-gray-700 pb-1">
                MINIMUM BELANJA
              </p>
              <input
                name="min"
                autoComplete="off"
                className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
                  errors.min
                    ? "focus:outline-red-500 border-2 border-red-500"
                    : null
                }`}
                placeholder="Minimum belanja"
                {...register("min", {
                  required: {
                    value: true,
                    message: "Minimum pembelian harus di isi!",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Format tidak sesuai!",
                  },
                })}
                onKeyUp={() => {
                  trigger("min");
                }}
              />

              {errors.min && (
                <p className="text-xs text-red-500 pt-2">
                  {errors.min.message}
                </p>
              )}
            </div>
            <div className="w-full h-auto relative mb-4">
              <p className="text-xs font-bold text-gray-700 pb-1">
                JUMLAH DISCOUNT
              </p>
              <div className="flex gap-2">
                <input
                  name="persent"
                  autoComplete="off"
                  className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
                    errors.persent
                      ? "focus:outline-red-500 border-2 border-red-500"
                      : null
                  }`}
                  placeholder="Niali persent e.g: (50)"
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
                <p className="px-8 flex items-center justify-center border border-orange-500/50 rounded-md">
                  %
                </p>
              </div>

              {errors.persent && (
                <p className="text-xs text-red-500 pt-2">
                  {errors.persent.message}
                </p>
              )}
            </div>
            <div className="w-full h-auto relative mb-4">
              <p className="text-xs font-bold text-gray-700 pb-1">
                TANGGAL MULAI VOUCHER
              </p>
              <input
                name="start"
                type="date"
                autoComplete="off"
                className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-none ${
                  errors.start
                    ? "focus:border-red-500 border-red-500 focus:ring-0"
                    : null
                }`}
                {...register("start", {
                  required: {
                    value: true,
                    message: "Tanggal muali harus di isi!",
                  },
                })}
                onKeyUp={() => {
                  trigger("start");
                }}
              />

              {errors.start && (
                <p className="text-xs text-red-500 pt-2">
                  {errors.start.message}
                </p>
              )}
            </div>
            <div className="w-full h-auto relative mb-4">
              <p className="text-xs font-bold text-gray-700 pb-1">
                TANGGAL BERAKHIR VOUCHER
              </p>
              <input
                name="end"
                type="date"
                autoComplete="off"
                className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-none ${
                  errors.end
                    ? "focus:border-red-500 border-red-500 focus:ring-0"
                    : null
                }`}
                {...register("end", {
                  required: {
                    value: true,
                    message: "Tanggal berakhir harus di isi!",
                  },
                })}
                onKeyUp={() => {
                  trigger("end");
                }}
              />

              {errors.end && (
                <p className="text-xs text-red-500 pt-2">
                  {errors.end.message}
                </p>
              )}
            </div>
            <div className="w-full h-12 flex justify-end gap-2">
              <button
                type="submit"
                className="w-full px-6 h-8 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
              >
                TAMBAH
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default memo(FormVOucher);
