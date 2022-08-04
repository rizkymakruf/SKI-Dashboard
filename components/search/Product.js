import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useContext, memo } from "react";

const SearchProduct = (props) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  return (
    <form
      className="w-full flex items-center justify-between  border-b-2 border-gray-200 pb-4"
      onSubmit={async function handleSubmit(e) {
        e.preventDefault();
        globalAct.setIsFetch(true);

        const find = {
          name: "%" + e.currentTarget.name.value + "%",
          uri: "product/search",
        };
        const check = e.currentTarget.name.value !== "" ? true : false;
        try {
          const res = await fetchJson("/api/prot/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(find),
          });
          props.setSearchData(res.data);
          if (!check) {
            props.setIsSearch(false);
          } else {
            props.setIsSearch(true);
          }
        } catch (error) {
          console.log("error", error);
          if (error instanceof FetchError) {
            globalAct.setErrorMsg(error.data.message);
          } else {
            globalAct.setErrorMsg("An unexpected error happened");
          }
        }

        globalAct.setModal("");
        globalAct.setIsFetch(false);
      }}
    >
      <div className="flex gap-2 w-full items-center">
        {/* <p className="text-sm font-bold text-red-600 w-1/6">CARI PRODUK</p> */}
        <input
          name="name"
          placeholder="Search..."
          autoComplete="off"
          className="placeholder-gray-400 px-2 w-full pr-10 h-10 bg-white outline-none focus:ring-2 duration-500 focus:ring-blue-500 border-2 border-gray-400 rounded-md"
        />
        <button
          className=" bg-blue-500/30 w-12 h-10 flex items-center justify-center rounded-md  hover:bg-blue-500/50"
          globalCtx={globalCtx}
          globalAct={globalAct}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default memo(SearchProduct);
