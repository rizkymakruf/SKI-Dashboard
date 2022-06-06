import FormProduct from "components/form/FormProduct";
import { useContext } from "react";
import { GlobalContext } from "context/global";
const ProductModal = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);

  return (
    <div className="bg-white w-full h-full rounded-md shadow-sm shadow-black">
      <div className="bg-red-500 h-12 w-full flex items-center justify-between px-3">
        <p className="text-white font-bold">Create new product</p>
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
      <FormProduct
        // Default Form
        globalCtx={globalCtx}
        globalAct={globalAct}
        onSubmit={async function handleSubmit(e) {
          e.preventDefault();
          globalAct.setIsFetch(true);

          const body = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
            uri: "login_office",
          };

          try {
            await fetchJson("/api/post", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
            router.replace("/config/dashboard");
          } catch (error) {
            if (error instanceof FetchError) {
              globalAct.setErrorMsg(error.data.message);
            } else {
              globalAct.setErrorMsg("An unexpected error happened");
            }
          }

          globalAct.setIsFetch(false);
        }}
      />
    </div>
  );
};

export default ProductModal;
