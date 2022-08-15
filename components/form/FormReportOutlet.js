import { useContext, useCallback, memo, useEffect } from "react";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";

const FormReportOutlet = ({ onSubmit }) => {
  const { globalAct, globalCtx } = useContext(GlobalContext);

  return (
    <>
      <div className="w-full h-auto">
        <form onSubmit={onSubmit}>
          <div className="w-full h-full grid grid-cols-1 gap-4 select-none p-3">
            <div className="w-full space-y-2">
              <div className="w-full">
                <p>Date From</p>
                <input
                  name="start"
                  id="start"
                  type={"date"}
                  className="w-full rounded-md border-2"
                ></input>
              </div>
              <div className="w-full">
                <p>Date To</p>
                <input
                  name="end"
                  id="end"
                  type={"date"}
                  className="w-full rounded-md border-2"
                ></input>
              </div>
              <div className="w-full h-auto pt-2">
                <button
                  type={"submit"}
                  className="w-full py-1 bg-green-500 border-2 border-green-700 text-white hover:bg-green-300 hover:text-green-700  font-semibold rounded overflow-hidden"
                >
                  VIEW REPORT
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default memo(FormReportOutlet);
