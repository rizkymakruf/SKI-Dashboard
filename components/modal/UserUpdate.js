import { useContext, memo, useMemo } from "react";
import { GlobalContext } from "context/global";
import FormUserUpdate from "components/form/FormUserUpdate";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";

const UserUpdateModal = (props) => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <div className="bg-white w-full h-full rounded-md shadow-sm shadow-black">
      <div className="bg-red-500 h-12 w-full flex items-center justify-between px-3 rounded-t-md">
        <p className="text-white font-bold">Update user</p>
        <button
          onClick={() => {
            globalAct.setModal(""),
              globalAct.setSelectedData({
                pict: "/img/user-default.png",
              });
          }}
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
      {useMemo(() => {
        return (
          <FormUserUpdate
            globalCtx={globalCtx}
            globalAct={globalAct}
            onSubmit={async function handleSubmit(e) {
              e.preventDefault();
              globalAct.setIsFetch(true);

              const body = {
                key: e.currentTarget.key.value,
                username: e.currentTarget.username.value,
                fullname: e.currentTarget.fullname.value,
                address: e.currentTarget.address.value,
                email: e.currentTarget.email.value,
                phone: e.currentTarget.phone.value,
                outlet: e.currentTarget.outlet.value,
                pict: [],
                uri: "user/update",
              };

              try {
                await fetchJson("/api/prot/put", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                });
                // router.push("/dashboardSKI");
                router.reload();
              } catch (error) {
                console.log("error", error);
                if (error instanceof FetchError) {
                  globalAct.setErrorMsg(error.data.message);
                } else {
                  globalAct.setErrorMsg("An unexpected error happened");
                }
              }

              // router.replace("/dashboardSKI/users");
              globalAct.setModal("");
              globalAct.setIsFetch(false);
            }}
          />
        );
      }, [])}
    </div>
  );
};

export default memo(UserUpdateModal);
