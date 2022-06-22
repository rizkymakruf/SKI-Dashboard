import { useState, useEffect, useRef } from "react";

export default function FormReport({
  myRef,
  globalCtx,
  globalAct,
  onSubmit,
  update,
  setUpdate,
  slide,
  setSlide,
  isFetch,
  errorMessage,
  cancelRemove,
  handleImage,
  removeMe,
}) {
  //   const [detail, setDetail] = useState(false);
  //   const [infoLengkap, setInfoLengkap] = useState(false);

  //   useEffect(() => {
  //     !detail && setInfoLengkap(false);
  //   });
  const [imageFile, setImageFile] = useState([]);
  const inputFileImage = useRef(null);

  const upLoad = (props, ref) => {
    inputFileImage.current.click();
  };

  const resetForm = (e) => {
    e.preventDefault();
    document.querySelector("form").reset();
    setSlide([]);
    setUpdate([]);
  };

  const data = [
    {
      report: "Report by product",
    },
    {
      report: "Report by brand",
    },
    {
      report: "Report by category",
    },
  ];

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
                  {data.map((dat, idx) => {
                    return <option value={dat.report}>{dat.report}</option>;
                  })}
                </select>
              </div>
              <div className="w-full">
                <p>Date From</p>
                <input
                  name="dateFrom"
                  id="dateFrom"
                  type={"date"}
                  className="w-full rounded-md border-2 border-orange-500/50 bg-orange-300"
                ></input>
              </div>
              <div className="w-full">
                <p>Date To</p>
                <input
                  name="dateTo"
                  id="dateTo"
                  type={"date"}
                  className="w-full rounded-md border-2 border-orange-500/50 bg-orange-300"
                ></input>
              </div>

              <div className="w-full h-auto relative py-6 flex justify-end gap-1">
                <div className="w-full h-auto flex justify-end gap-2">
                  <button
                    onClick={onSubmit}
                    // disabled={globalCtx.isFetch ? "disabled" : ""}
                    className="px-6 h-8 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
                  >
                    View Report
                  </button>
                  <span
                    className={`${
                      !isFetch && "invisible"
                    } flex absolute h-4 w-4 top-3 right-4 -mt-1 -mr-1`}
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-50 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-300"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
