import { useContext, useCallback, memo } from "react";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";

const FormReportOutlet = ({
  setDataReport,
  setMode,
  setTotalRows,
  setNewBody,
}) => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const data = [
    {
      key: "brand",
      name: "Report by brand",
    },
    {
      key: "category",
      name: "Report by category",
    },
    {
      key: "product",
      name: "Report by product",
    },
  ];

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    globalAct.setIsFetch(true);
    const startDate = new Date(e.currentTarget.start.value);
    const endDate = new Date(e.currentTarget.end.value);

    const body = {
      uri: "report",
      start: startDate / 1000,
      end: endDate / 1000,
      method: e.currentTarget.report.value,
      index: 0,
      length: 10,
    };
    setNewBody(body);
    try {
      const res = await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await setMode(body.method);
      await setDataReport(res.data);
      await setTotalRows(res.total);
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
    <>
      <div className="w-full h-auto">
        <form onSubmit={onSubmit}>
          <div className="w-full h-full grid grid-cols-1 gap-4 select-none p-3">
            <div className="w-full space-y-2">
              <div className="w-full">
                <p>Report Filter</p>
                <select
                  name="report"
                  id="report"
                  className="w-full rounded-md border-2 border-orange-500/50"
                >
                  {data.map((dat) => (
                    <option value={dat.key}>{dat.name}</option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <p>Date From</p>
                <input
                  name="start"
                  id="start"
                  type={"date"}
                  className="w-full rounded-md border-2 border-orange-500/50 bg-orange-300"
                ></input>
              </div>
              <div className="w-full">
                <p>Date To</p>
                <input
                  name="end"
                  id="end"
                  type={"date"}
                  className="w-full rounded-md border-2 border-orange-500/50 bg-orange-300"
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
