import { useState } from "react";

export default function FormLogin({ myRef, globalCtx, globalAct, onSubmit }) {
  const [formType, setFormType] = useState(false);
  return (
    <div className="w-full h-auto">
      <form onSubmit={onSubmit}>
        <div className="w-full h-full select-none">
          <div className="w-full h-full p-3 backdrop-blur bg-white/50 shadow-md rounded-md border">
            <div className="w-full h-auto relative mb-4">
              <p className="text-sm font-extrabold">Username</p>
              <input
                name="username"
                type="text"
                className="placeholder-gray-300 form-input mt-1 rounded-md border w-full"
                placeholder="Username"
                disabled={globalCtx.isFetch ? "disabled" : ""}
              />
            </div>
            <div className="w-full h-auto relative mb-4">
              <p className="text-sm font-extrabold">Password</p>
              <div className="relative">
                <button className="absolute top-3.5 right-2.5">
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
                </button>
              </div>
              <input
                name="password"
                type="text"
                className="placeholder-gray-300 form-input mt-1 rounded-md border w-full"
                placeholder="Password"
                disabled={globalCtx.isFetch ? "disabled" : ""}
              />
            </div>

            <div className="w-full h-12 flex justify-between gap-2">
              <div className="w-full h-full flex items-center text-xs text-red-400">
                {globalCtx.errorMsg}
              </div>
              <div className="w-auto h-full flex items-center">
                <button
                  disabled={globalCtx.isFetch ? "disabled" : ""}
                  className="px-8 h-10 bg-gray-50 border-2 border-gray-300 rounded overflow-hidden"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
