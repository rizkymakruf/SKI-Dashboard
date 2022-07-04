import { useContext } from "react";
import { GlobalContext } from "context/global";
import TopBrand from "components/form/TopBrand";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";

const AddedBrandModal = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <div className="bg-white w-full h-auto rounded-md shadow-sm shadow-black p-6 space-y-4">
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

          try {
            await fetchJson("/api/prot/patch", {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
            // router.push("/dashboardSKI");
          } catch (error) {
            console.log("error", error);
            if (error instanceof FetchError) {
              globalAct.setErrorMsg(error.data.message);
            } else {
              globalAct.setErrorMsg("An unexpected error happened");
            }
          }

          router.reload("/dashboardSKI/topBrand");
          globalAct.setModal("");
          globalAct.setIsFetch(false);
        }}
      />
    </div>
  );
};

export default AddedBrandModal;
