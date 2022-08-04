import { useForm } from "react-hook-form";
import { useContext, memo, useCallback } from "react";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";

const FormSubCategory = (props) => {
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
  console.log(props.maincategory);

  const onSubmit = useCallback(async (data) => {
    const body = {
      outlet: globalCtx.currentBrand,
      name: data.name,
      category: data.mainCategory,
      uri: "subcategory/add",
    };

    try {
      await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      router.replace(`/dashboard/category/${globalCtx.currentBrand}`);
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
  }, []);

  return (
    <div className="w-full h-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-full select-none">
          <div className="w-full h-full p-3 backdrop-blur bg-white/30 rounded-md border border-gray-300 hover:shadow-md hover:shadow-red-500">
            <div className="w-full h-auto relative mb-2">
              <p className="text-xs font-bold text-gray-700 pb-1">KATEGORI</p>
              <select
                name="mainCategory"
                type="text"
                placeholder="Sub Category"
                className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-none ${
                  errors.mainCategory
                    ? "focus:border-red-500 border-red-500 focus:ring-0"
                    : null
                }`}
                {...register("mainCategory", {
                  required: {
                    value: true,
                    message: "",
                  },
                })}
                onKeyUp={() => {
                  trigger("mainCategory");
                }}
              >
                <option>-- Select Category --</option>
                {props.maincategory.map((x) => (
                  <option value={x.key}>{x.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full h-auto relative mb-4">
              <p className="text-xs font-bold text-gray-700 pb-1">
                SUB KATEGORI
              </p>
              <input
                name="name"
                autoComplete="off"
                className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
                  errors.name
                    ? "focus:outline-red-500 border-2 border-red-500"
                    : null
                }`}
                placeholder="Sub kategori name"
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

export default memo(FormSubCategory);
