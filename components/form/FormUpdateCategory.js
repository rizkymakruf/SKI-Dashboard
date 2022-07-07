import { useForm } from "react-hook-form";
import { useContext } from "react";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";

export default function FormUpdateCategory() {
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

  const onSubmit = async (data) => {
    console.log("disi", data);

    const body = {
      key: data.key,
      name: data.name,
      uri: "category/update",
    };

    try {
      await fetchJson("/api/prot/patch", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      router.replace("/dashboardSKI/category");
      globalAct.setModal("");
      reset();
    } catch (error) {
      console.log("error", error);
      if (error instanceof FetchError) {
        globalAct.setErrorMsg(error.data.message);
      } else {
        globalAct.setErrorMsg("An unexpected error happened");
      }
    }
    globalAct.setIsFetch(false);
  };

  return (
    <div className="w-full h-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-full select-none">
          <div className="w-full h-full p-3 backdrop-blur bg-white/30 rounded-md border border-gray-300 shadow-md">
            <div className="w-full h-auto relative mb-4">
              <p className="text-sm font-bold text-red-600 mb-2">
                Category Name
              </p>
              {/* key */}
              <input
                name="key"
                type="hidden"
                defaultValue={globalCtx.selectedData.key}
                {...register("key", { required: true })}
              ></input>
              {/* end key */}
              <input
                name="name"
                autoComplete="off"
                className={`rounded-md p-2 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
                  errors.name ? "focus:outline-red-500 outline-red-500" : null
                }`}
                defaultValue={globalCtx.selectedData.name}
                placeholder={globalCtx.selectedData.name}
                {...register("name", {
                  minLength: {
                    value: 3,
                    message: "Nama categori minimal 3 karakter!",
                  },
                  required: {
                    value: true,
                    message: "Nama categori harus di isi!",
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
            <div className="w-full h-12 flex justify-end gap-2">
              <div className="w-auto h-full flex items-center gap-x-2">
                <button
                  type="submit"
                  onClick={() => setValue("key", globalCtx.selectedData.key)}
                  className="px-6 h-8 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
                  // disabled={globalCtx.isFetch ? "disabled" : ""}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
