import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useContext, memo } from "react";

const SearchProductOutlet = (props) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  return (
    <form
      className="w-full flex items-center justify-between"
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
          console.log(res);
          props.setSearchData(res.data);
          if (!check) {
            props.setIsSearch(false);
            props.setSearchData([]);
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
      <p className="text-md font-bold text-red-600 w-2/6">Cari Produk</p>
      <div className="w-full">
        <div className="relative">
          <button className="absolute top-1.5 right-1.5 bg-blue-500/30 p-1 rounded-md hover:bg-blue-500/50">
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
        <input
          name="name"
          placeholder="Cari..."
          autoComplete="off"
          className="placeholder-gray-400 px-2 w-full h-10 bg-white outline-none focus:ring-2 duration-500 focus:ring-blue-500 border-2 border-gray-300 rounded-md"
        />
      </div>
    </form>
  );
};

export default memo(SearchProductOutlet);