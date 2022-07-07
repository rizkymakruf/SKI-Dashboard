import { useForm } from "react-hook-form";
import { useContext, memo, useCallback } from "react";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";

const FormCategory = () => {
  const {
    reset,
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();

  const onSubmit = useCallback(async (data) => {
    const body = {
      name: data.name,
      uri: "category/add",
    };

    try {
      const res = await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      reset();
      router.replace("/dashboardSKI/category");
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
          <div className="p-3 backdrop-blur bg-white/30 rounded-md border border-gray-300 shadow-md space-y-3">
            <p className="text-md font-bold text-red-600">
              Create Main Category
            </p>
            <div className="w-full h-full flex gap-3">
              <div className="w-full h-auto relative">
                <input
                  autoComplete="off"
                  placeholder="Category Name"
                  className={`rounded-md p-2 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
                    errors.name ? "focus:outline-red-500 outline-red-500" : null
                  }`}
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

              <div className="w-auto h-full flex items-center">
                <button
                  type="submit"
                  className="px-6 h-10 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
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

export default memo(FormCategory);
