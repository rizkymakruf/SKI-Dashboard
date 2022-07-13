// import { memo } from "react";
import { useForm } from "react-hook-form";
import { useContext, memo, useCallback } from "react";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";

const TopBrand = () => {
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
    const body = {
      key: data.key,
      position: parseInt(data.position),
      uri: "outlet/brand",
    };

    console.log("addBrand", body);

    try {
      const res = await fetchJson("/api/prot/patch", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      reset();
      router.replace("/dashboardSKI/topBrand");
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex-row justify-between items-center gap-6">
        <div className="bg-red-500 rounded-t-md py-3 px-4">
          <p className="text-md font-semibold text-white">
            Set position top brand
          </p>
        </div>
        <div className="space-y-4 p-3 w-full bg-white rounded-b-md">
          {/* key */}
          <input
            name="key"
            type="hidden"
            defaultValue={globalCtx.selectedData.key}
            {...register("key", { required: true })}
          ></input>
          {/* end key */}
          <select
            name="position"
            className={`rounded-md p-2 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
              errors.position
                ? "focus:outline-red-500 border-2 border-red-500"
                : null
            }`}
            {...register("position", {
              required: {
                value: true,
                message: "",
              },
            })}
            onKeyUp={() => {
              trigger("position");
            }}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>

            {errors.position && (
              <p className="text-xs text-red-500 pt-2">
                {errors.position.message}
              </p>
            )}
          </select>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              onClick={() => setValue("key", globalCtx.selectedData.key)}
              className="px-6 h-8 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default memo(TopBrand);
