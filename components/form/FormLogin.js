import { useState } from "react";

export default function FormLogin({ myRef, globalCtx, globalAct, onSubmit }) {
  const [formType, setFormType] = useState(false);
  return (
    <div className="w-full h-auto">
      <p className="text-5xl text-red-500 font-bold pb-10">
        Login <br /> Dashboard
      </p>
      <form onSubmit={onSubmit}>
        <div className="w-full h-full select-none">
          <div className="w-full h-full ">
            <div className="w-full h-auto relative mb-4">
              <p className="text-sm font-extrabold">Username</p>
              <input
                name="username"
                type="text"
                autoComplete="off"
                className="placeholder-gray-300 form-input mt-1 focus:ring-0 border-b-2 border-t-0 border-x-0 w-full"
                placeholder="Username"
                disabled={globalCtx.isFetch ? "disabled" : ""}
              />
            </div>
            <div className="w-full h-auto relative mb-4">
              <p className="text-sm font-extrabold">Password</p>
              <div className="relative">
                {/* <button className="absolute top-3.5 right-2.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button> */}
              </div>
              <input
                name="password"
                type="password"
                className="placeholder-gray-300 form-input mt-1 focus:ring-0 border-b-2 border-t-0 border-x-0 w-full"
                placeholder="Password"
                disabled={globalCtx.isFetch ? "disabled" : ""}
              />
            </div>

            <div className="w-full flex flex-col justify-center pt-4">
              <div className="w-full h-full flex items-center text-xs text-red-400 py-3">
                {globalCtx.errorMsg}
              </div>
              <button
                disabled={globalCtx.isFetch ? "disabled" : ""}
                className="w-full px-8 h-10 bg-red-500 border-2 border-red-300 text-white font-bold hover:bg-red-500/50 hover:text-red-500 rounded overflow-hidden"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
