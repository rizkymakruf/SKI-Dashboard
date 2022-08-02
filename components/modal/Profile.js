import { useContext, useEffect, memo, useCallback } from "react";
import fetchJson, { FetchError } from "lib/fetchJson";
import { GlobalContext } from "context/global";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const Profile = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    console.log("fetch data status : ", globalCtx.isFetch);
  }, [globalCtx]);

  const logout = useCallback(async () => {
    const body = {
      uri: "logout",
    };
    try {
      const lg = await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await router.push("/");
    } catch (error) {
      if (error instanceof FetchError) {
        globalAct.setErrorMsg(error.data.message);
      }
      // else {
      //   globalAct.setErrorMsg("An unexpected error happened");
      // }
    }
  }, []);
  return (
    <div className="bg-white w-full h-auto rounded-md shadow-sm shadow-black">
      <div className="bg-red-500 h-12 w-full flex items-center justify-between px-3 rounded-t-md">
        <p className="text-white font-bold">User Profile</p>
        <button
          onClick={() => globalAct.setModal("")}
          className={
            "bg-white items-center justify-center h-8 w-8 rounded-md shadow-md flex gap-x-1 text-sm text-red-500 hover:w-24 duration-150 hover:before:content-['Close']"
          }
        >
          {/* <p className="text-md font-bold text-blue-500">Close</p> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="p-3 w-full flex flex-col gap-y-2">
        <div className="flex items-center flex-col gap-2">
          {globalCtx.userPict === "" ? (
            <div className="bg-black w-full h-40 rounded-md" />
          ) : (
            <div className="relative h-40 w-40 rounded-md">
              <Image
                layout="fill"
                className="rounded-md"
                src={globalCtx.userPict}
                priority
              />
            </div>
          )}
          <div className="items-center text-center">
            <p className="text-md font-semibold mb-8">{globalCtx.fullname}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 ">
          <button
            onClick={() => {
              globalAct.setModal(""), logout();
            }}
            disabled={globalCtx.isFetch ? "disabled" : ""}
            className="p-2 text-left bg-red-500 rounded-md hover:bg-red-500/50 flex flex-row items-center justify-center gap-2"
          >
            <p className="text-md font-bold text-white hover:text-red-500">
              LogOut
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-red-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 5C3 3.9 3.9 3 5 3H13V5H5V19H13V21H5C3.9 21 3 20.1 3 19V5ZM17.176 11L14.64 8.464L16.054 7.05L21.004 12L16.054 16.95L14.64 15.536L17.176 13H10.59V11H17.176Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Profile);
