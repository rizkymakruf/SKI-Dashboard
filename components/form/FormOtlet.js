import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";

export default function FormOtlet({
  globalCtx,
  onSubmit,
  setUpdate,
  setSlide,
  isFetch,
  errorMessage,
  handleImage,
}) {
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

  // useform mulai dari sini
  const {
    reset,
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-full h-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-full grid grid-cols-2 gap-4 select-none p-5">
          <div className="w-full space-y-2">
            <div className="w-full">
              <p>Nama Otlet</p>
              <input
                name="name"
                autocomplete="off"
                placeholder="Nama Otlet"
                className={`rounded-md p-2 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
                  errors.name ? "focus:outline-red-500 outline-red-500" : null
                }`}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Nama outlet harus di isi!",
                  },
                })}
                onKeyUp={() => {
                  trigger("name");
                }}
              ></input>

              {errors.name && (
                <p className="text-xs text-red-500 pt-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <p>Short Name Otlet</p>
              <input
                name="shortname"
                autocomplete="off"
                placeholder="Short Name Otlet"
                className={`rounded-md p-2 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
                  errors.shortname
                    ? "focus:outline-red-500 outline-red-500"
                    : null
                }`}
                {...register("shortname", {
                  required: {
                    value: true,
                    message: "Short name outlet harus di isi!",
                  },
                  minLength: {
                    value: 3,
                    message: "Short name minimal 3 karakter!",
                  },
                  pattern: {
                    value: "^[A-Za-z]+$",
                    message: "Entered value does not match email format",
                  },
                })}
                onKeyUp={() => {
                  trigger("shortname");
                }}
              ></input>

              {errors.shortname && (
                <p className="text-xs text-red-500 pt-2">
                  {errors.shortname.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <p>Deskripsi Otlet</p>
              <textarea
                name="description"
                autocomplete="off"
                className="rounded-md p-2 border-2 border-orange-500/50 w-full h-40"
                placeholder="Deskripsi Otlet"
              ></textarea>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full h-auto relative pt-2">
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
                    disabled={globalCtx.isFetch ? "disabled" : ""}
                    className="px-6 h-8 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
