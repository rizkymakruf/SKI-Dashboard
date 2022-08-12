import { useForm } from "react-hook-form";
import { useContext, memo, useCallback } from "react";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";

const DeleteDiscountModal = (props) => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();
  console.log("delete discount", globalCtx.selectedData.key);

  return (
    <div className="bg-white w-full h-auto rounded-md shadow-sm shadow-black">
      <div className="px-3 py-2 w-full flex flex-row justify-between items-center">
        <div className="flex gap-1">
          <p className="text-md font-semibold">Apakah anda yakin hapus</p>
          <p className="text-md font-semibold text-red-500">
            {globalCtx.selectedData.percentage}
          </p>
          <p className="text-md font-semibold"> dari list discount ?</p>
        </div>
        <div className="flex gap-x-4">
          <button
            onClick={() => globalAct.setModal("")}
            className="px-6 h-8 bg-blue-500/30 text-blue-500 border-2 shadow-md hover:bg-blue-500/50 border-blue-300 font-semibold rounded overflow-hidden"
          >
            Cancel
          </button>
          <button
            globalCtx={globalCtx}
            globalAct={globalAct}
            onClick={async function handleSubmit(e) {
              e.preventDefault();
              globalAct.setIsFetch(true);

              const body = {
                uri: "voucher/status",
                key: globalCtx.selectedData.key,
              };

              console.log("delete discount", body);

              // try {
              //   await fetchJson("/api/prot/patch", {
              //     method: "PATCH",
              //     headers: { "Content-Type": "application/json" },
              //     body: JSON.stringify(body),
              //   });
              //   globalAct.setModal("");
              //   router.replace(`/dashboard/voucher/${globalCtx.currentBrand}`);
              // } catch (error) {
              //   console.log("error", error);
              //   if (error instanceof FetchError) {
              //     globalAct.setErrorMsg(error.data.message);
              //   } else {
              //     globalAct.setErrorMsg("An unexpected error happened");
              //   }
              // }
              // globalAct.setIsFetch(false);
            }}
            className="px-6 h-8 bg-red-500/30 text-red-500 border-2 shadow-md hover:bg-red-500/50 border-red-300 font-semibold rounded overflow-hidden"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(DeleteDiscountModal);
