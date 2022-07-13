import { useContext, memo, useMemo } from "react";
import { GlobalContext } from "context/global";
import TopBrand from "components/form/TopBrand";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";

const AddedBrandModal = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <div className="w-full h-auto space-y-4">
      {useMemo(() => {
        return (
          <TopBrand
            globalCtx={globalCtx}
            globalAct={globalAct}
            onSubmit={async function handleSubmit(e) {
              e.preventDefault();
              globalAct.setIsFetch(true);

              const body = {
                key: e.currentTarget.key.value,
                position: parseInt(e.currentTarget.position.value),
                uri: "outlet/brand",
              };

              console.log("addbran", body);
              // try {
              //   await fetchJson("/api/prot/patch", {
              //     method: "PATCH",
              //     headers: { "Content-Type": "application/json" },
              //     body: JSON.stringify(body),
              //   });
              //   router.reload("/dashboardSKI/topBrand");
              //   globalAct.setModal("");
              //   // router.push("/dashboardSKI");
              // } catch (error) {
              //   console.log("error", error);
              //   alert(globalCtx.errorMsg);
              //   if (error instanceof FetchError) {
              //     globalAct.setErrorMsg(error.data.message);
              //   } else {
              //     globalAct.setErrorMsg("An unexpected error happened");
              //   }
              // }

              // globalAct.setIsFetch(false);
            }}
          />
        );
      }, [])}
    </div>
  );
};

export default memo(AddedBrandModal);
