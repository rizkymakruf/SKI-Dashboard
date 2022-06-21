import { useState, useEffect, useRef } from "react";

export default function FormOtlet({
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

  return (
    <div className="w-full h-auto">
      <form onSubmit={onSubmit}>
        <div className="w-full h-full grid grid-cols-2 gap-4 select-none p-5">
          <div className="w-full space-y-2">
            <div className="w-full">
              <p>Nama Otlet</p>
              <input
                className="rounded-md p-2 border-2  border-orange-500/50 w-full focus:outline-blue-500 "
                placeholder="Nama Otlet"
              ></input>
            </div>
            {/* <div className="w-full">
              <p>Password Otlet</p>
              <input
                className="rounded-md p-2 border-2 border-orange-500/50 w-full focus:outline-blue-500 "
                placeholder="Password Otlet"
              ></input>
            </div> */}
            <div className="w-full">
              <p>Deskripsi Otlet</p>
              <textarea
                className="rounded-md p-2 border-2 border-orange-500/50 w-full h-40"
                placeholder="Deskripsi Otlet"
              ></textarea>
            </div>
            <div className="w-full"></div>
          </div>
          <div className="w-full">
            <div className="w-full h-auto relative pt-2">
              <input
                accept="image/png, image/gif, image/jpeg"
                type="file"
                id="fileContract"
                ref={inputFileImage}
                style={{ display: "none" }}
                onChange={(e) => handleImage(e)}
                disabled={isFetch ? "disabled" : ""}
              />

              <div className="w-full h-auto relative flex-row gap-2 flex items-center px-4 pt-2">
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
                    onClick={(e) => resetForm(e)}
                    // disabled={globalCtx.isFetch ? "disabled" : ""}
                    className="px-6 h-8 bg-yellow-500/30 text-yellow-500 border-2 shadow-md hover:bg-yellow-500/50 border-yellow-300 font-semibold rounded overflow-hidden"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onSubmit}
                    // disabled={globalCtx.isFetch ? "disabled" : ""}
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
