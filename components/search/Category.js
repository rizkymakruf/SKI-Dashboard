import { GlobalContext } from "context/global";
import { useContext, useEffect, useState } from "react";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";

const SearchCategory = (props) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <form
      className="w-full flex items-center justify-between border border-gray-300 rounded-md p-3 shadow-md"
      onSubmit={async function handleSubmit(e) {
        e.preventDefault();
        globalAct.setIsFetch(true);

        const body = {
          name: "%" + e.currentTarget.name.value + "%",
          uri: "category/search",
        };

        console.log(body);

        try {
          const res = await fetchJson("/api/prot/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          console.log(res);
          props.setData(res.data);
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
      <p className="text-sm font-bold text-red-600 w-1/6">Find Category</p>
      <div className="w-full">
        <div className="relative">
          <button
            className="absolute top-1.5 right-1.5 bg-blue-500/30 p-1 rounded-md shadow-md hover:bg-blue-500/50"
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
        <input
          name="name"
          placeholder="Search..."
          autoComplete="off"
          className="placeholder-gray-400 px-2 w-full pr-10 h-10 bg-white outline-none focus:ring-2 duration-500 focus:ring-blue-500 border-2 border-gray-300 rounded-md"
        />
      </div>
    </form>
  );
};

export default SearchCategory;
