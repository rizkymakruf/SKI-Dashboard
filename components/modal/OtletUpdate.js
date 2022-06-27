import { useContext } from "react";
import { GlobalContext } from "context/global";
import FormOtletUpdate from "components/form/FormOtletUpdate";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import axios from "axios";
import { headers } from "next.config";

const OtletUpdateModal = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <div className="bg-white w-full h-full rounded-md shadow-sm shadow-black">
      <div className="bg-red-500 h-12 w-full flex items-center justify-between px-3 rounded-t-md">
        <p className="text-white font-bold">Update otlet</p>
        <button
          onClick={() => globalAct.setModal("")}
          className={
            "bg-white items-center justify-center h-8 w-8 rounded-md shadow-md flex gap-x-2 text-xs text-red-500 hover:w-24 duration-150 hover:after:content-['Cancel']"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <FormOtletUpdate
        globalCtx={globalCtx}
        globalAct={globalAct}
        onSubmit={async function handleSubmit(e) {
          e.preventDefault();
          globalAct.setIsFetch(true);

          const body = {
            key: e.currentTarget.key.value,
            name: e.currentTarget.name.value,
            pict: [],
            description: e.currentTarget.description.value,
            uri: "outlet/update",
          };

          try {
            // const a = await axios.put(
            //   `http://192.168.254.197:9036/outlet/update`,
            //   {
            //     headers: {
            //       "Content-Type": "application/json",
            //       Authorization: ``,
            //     },
            //     body: JSON.stringify(body),
            //   }
            // );
            // console.log(a);
            await fetchJson("/api/prot/put", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
            router.push("/dashboardSKI");
          } catch (error) {
            console.log("error", error);
            if (error instanceof FetchError) {
              globalAct.setErrorMsg(error.data.message);
            } else {
              globalAct.setErrorMsg("An unexpected error happened");
            }
          }

          router.replace("/dashboardSKI/outlet");
          globalAct.setModal("");
          globalAct.setIsFetch(false);
        }}
      />
    </div>
  );
};

export default OtletUpdateModal;
