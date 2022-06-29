import { useState, useEffect, useRef } from "react";

export default function FormContentUpdate({
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

  const tb = [
    {
      p: 1,
      title: "Top Slider",
    },
    {
      title: "Bottom Slider",
      p: 2,
    },
  ];

  // console.log(globalCtx.selectedData.title);

  return (
    <div className="w-full h-auto">
      <form onSubmit={onSubmit}>
        <div className="w-full h-full select-none">
          <div className="w-full grid grid-cols-2 gap-3 h-full p-3 backdrop-blur bg-white/30 rounded-md border border-gray-300 shadow-md">
            <div className="w-full">
              <input
                name="key"
                defaultValue={globalCtx.selectedData.key}
                type="hidden"
              ></input>
              <div className="w-full h-auto relative mb-4">
                <p className="text-sm font-bold text-red-600 mb-2">
                  Title content
                </p>
                <input
                  name="title"
                  type="text"
                  className="placeholder-gray-400 h-10 bg-gray-500/20 form-input mt-1 rounded-md border border-gray-300 w-full focus:ring-2 duration-500 focus:ring-blue-500"
                  placeholder={globalCtx.selectedData.title}
                  defaultValue={globalCtx.selectedData.title}
                  // disabled={globalCtx.isFetch ? "disabled" : ""}
                />
              </div>

              <div className="w-full h-auto relative mb-4">
                <p className="text-sm font-bold text-red-600 mb-2">
                  Button content
                </p>
                <input
                  name="label"
                  type="text"
                  autocomplete="off"
                  className="placeholder-gray-400 h-10 bg-gray-500/20 form-input mt-1 rounded-md border border-gray-300 w-full focus:ring-2 duration-500 focus:ring-blue-500"
                  placeholder={globalCtx.selectedData.label}
                  defaultValue={globalCtx.selectedData.label}
                  // disabled={globalCtx.isFetch ? "disabled" : ""}
                />
              </div>

              <div className="w-full h-auto relative mb-4">
                <p className="text-sm font-bold text-red-600 mb-2">Position</p>
                <select
                  name="type"
                  id="type"
                  className="w-full rounded-md border-2 border-orange-500/50"
                >
                  {tb.map((dat, idx) => {
                    return (
                      <option
                        selected={globalCtx.selectedData.type}
                        value={dat.p}
                      >
                        {dat.title}
                      </option>
                    );
                  })}
                  {/* <option value={1}>Top Slider</option>
                  <option value={2}>Bottom Slider</option> */}
                </select>
              </div>

              <div className="w-full h-auto relative mb-4">
                <p className="text-sm font-bold text-red-600 mb-2">
                  Description content
                </p>
                <textarea
                  name="description"
                  type="text"
                  className="placeholder-gray-400 h-32 bg-gray-500/20 form-input mt-1 rounded-md border border-gray-300 w-full focus:ring-2 duration-500 focus:ring-blue-500"
                  placeholder={globalCtx.selectedData.description}
                  defaultValue={globalCtx.selectedData.description}
                  // disabled={globalCtx.isFetch ? "disabled" : ""}
                />
              </div>
            </div>

            <div className="w-full h-auto relative pt-2">
              <p className="text-sm font-bold text-red-600 mb-2">
                Image Slider
              </p>
              <input
                accept="image/png, image/gif, image/jpeg"
                type="file"
                name="pict"
                id="fileContract"
                ref={inputFileImage}
                style={{ display: "none" }}
                onChange={(e) => handleImage(e)}
                disabled={isFetch ? "disabled" : ""}
              />

              <div className="w-full h-auto relative flex-row gap-2 flex items-center pt-2">
                <div
                  onClick={upLoad}
                  className="w-full h-32 relative z-0 flex text-gray-700 flex-col justify-center items-center rounded h-passport border-2 border-dashed bg-white backdrop-filter bg-opacity-20 backdrop-blur-lg"
                >
                  {isFetch ? (
                    <svg
                      className="animate-spin h-5 w-5 text-blue-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      <h3 className="text-gray-700">
                        <i className="fas fa-cloud-download-alt"></i>
                      </h3>

                      <p className="font-light text-xs text-black text-center px-3">
                        Drop here or click here
                      </p>
                    </>
                  )}
                </div>
              </div>

              {errorMessage && (
                <p className="px-4 text-red-600">{errorMessage}</p>
              )}

              <div className="w-full h-auto relative px-4 py-3 flex justify-end gap-1">
                <div className="w-full h-auto flex justify-end gap-2">
                  <button
                    disabled={globalCtx.isFetch ? "disabled" : ""}
                    className="px-6 h-8 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
                  >
                    Save
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
        </div>
      </form>
    </div>
  );
}
