import { useState, memo, useCallback, useContext } from "react";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";

const FormHistory = ({
  setData,
  setTotalRows,
  setHistory,
  setNewBody,
  currentBrand,
}) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    globalAct.setIsFetch(true);
    const startDate = new Date(e.currentTarget.start.value);
    const endDate = new Date(e.currentTarget.end.value);

    const body = {
      uri: "order/history",
      outlet: currentBrand,
      start: startDate / 1000,
      end: endDate / 1000,
      index: 0,
      length: 10,
    };
    setNewBody(body);
    console.log(body);
    try {
      const res = await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(res);
      await setData(res.data);
      await setTotalRows(res.total);
      await setHistory(true);
    } catch (error) {
      console.log("error", error);
      if (error instanceof FetchError) {
        globalAct.setErrorMsg(error.data.message);
      } else {
        globalAct.setErrorMsg("An unexpected error happened");
      }
    }
    globalAct.setIsFetch(false);
  }, []);

  return (
    <div className="w-full h-auto">
      <form onSubmit={onSubmit}>
        <div className="w-full h-full select-none">
          <div className="w-full h-full p-3 backdrop-blur bg-white/50 shadow-md rounded-md border space-y-2">
            <p className="text-sm font-semibold text-red-500 pb-2">
              FILTER HISTORY
            </p>
            <div className="w-full h-auto relative">
              <p className="text-sm font-semibold">Dari</p>
              <input
                name="start"
                type="date"
                className="placeholder-gray-300 form-input mt-1 rounded-md border w-full border-gray-300"
                placeholder="Username"
                disabled={globalCtx.isFetch ? "disabled" : ""}
              />
            </div>
            <div className="w-full h-auto relative">
              <p className="text-sm font-semibold">Sampai</p>
              <input
                name="end"
                type="date"
                className="placeholder-gray-300 form-input mt-1 rounded-md border w-full border-gray-300"
                placeholder="Password"
                disabled={globalCtx.isFetch ? "disabled" : ""}
              />
            </div>

            <div className="w-full">
              <button
                disabled={globalCtx.isFetch ? "disabled" : ""}
                className="w-full h-10 bg-green-500 border-2 border-green-700 text-white hover:bg-green-300 hover:text-green-700  font-semibold rounded overflow-hidden"
              >
                LIHAT HISTORY
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default memo(FormHistory);
