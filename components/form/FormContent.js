import { useForm } from "react-hook-form";
import {
  useContext,
  memo,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import { uploadFile } from "lib/imageK";
import Image from "next/image";

const FormContent = () => {
  const [imageFile, setImageFile] = useState("");
  const inputFileImage = useRef();

  const upLoad = useCallback(() => {
    inputFileImage.current.click();
  }, []);

  const handleChange = useCallback(async (e) => {
    globalAct.setIsFetch(true);
    const file = e.target.files[0];
    const typeFile = file.type.split("/")[1];
    const a = await uploadFile(file, `outlet.${typeFile}`, "outlet");
    setImageFile(a.url);
    globalAct.setIsFetch(false);
  });

  // useform mulai dari sini
  const {
    reset,
    trigger,
    isFetch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();

  const onSubmit = useCallback(async (data) => {
    const body = {
      pict: data.pict,
      title: data.title,
      label: data.label,
      type: parseInt(data.type),
      description: data.description,
      uri: "content/add",
    };

    console.log("add content", body);

    try {
      await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await reset();
      await globalAct.setModal("");
      await router.replace("/dashboardSKI/content");
    } catch (error) {
      if (error instanceof FetchError) {
        globalAct.setErrorMsg(error.data.message);
      } else {
        console.log(error);
        globalAct.setErrorMsg("An unexpected error happened");
      }
    }

    globalAct.setIsFetch(false);
  }, []);

  return (
    <div className="w-full h-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-full select-none">
          <div className="w-full grid grid-cols-2 gap-3 h-full p-3 ">
            <div className="w-full">
              <div className="w-full h-auto relative mb-4">
                <p className="text-sm font-bold text-red-600 mb-2">
                  Title content
                </p>
                <input
                  name="title"
                  placeholder="Title content"
                  className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
                    errors.title
                      ? "focus:outline-red-500 border-2 border-red-500"
                      : null
                  }`}
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Title content harus di isi!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("title");
                  }}
                ></input>

                {errors.title && (
                  <p className="text-xs text-red-500 pt-2">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="w-full h-auto relative mb-4">
                <p className="text-sm font-bold text-red-600 mb-2">
                  Button content
                </p>
                <input
                  name="label"
                  autocomplete="off"
                  placeholder="Button content"
                  className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
                    errors.label
                      ? "focus:outline-red-500 border-2 border-red-500"
                      : null
                  }`}
                  {...register("label", {
                    required: {
                      value: true,
                      message: "Label content harus di isi!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("label");
                  }}
                ></input>

                {errors.title && (
                  <p className="text-xs text-red-500 pt-2">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="w-full h-auto relative mb-4">
                <p className="text-sm font-bold text-red-600 mb-2">Position</p>
                <select
                  name="type"
                  id="type"
                  className={`rounded-md p-1 border-2  border-orange-500/50 w-full ${
                    errors.type
                      ? "focus:outline-red-500 border-2 border-red-500"
                      : null
                  }`}
                  {...register("type", {
                    required: {
                      value: true,
                      message: "Type content harus di isi!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("type");
                  }}
                >
                  <option value={1}>Top Slider</option>
                  <option value={2}>Bottom Slider</option>
                </select>

                {errors.type && (
                  <p className="text-xs text-red-500 pt-2">
                    {errors.type.message}
                  </p>
                )}
              </div>

              <div className="w-full h-auto relative mb-4">
                <p className="text-sm font-bold text-red-600 mb-2">
                  Description content
                </p>
                <textarea
                  name="description"
                  placeholder="Description content"
                  className={`rounded-md p-1 border-2  border-orange-500/50 w-full h-32 ${
                    errors.description
                      ? "focus:outline-red-500 border-2 border-red-500"
                      : null
                  }`}
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Description content harus di isi!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("description");
                  }}
                />

                {errors.description && (
                  <p className="text-xs text-red-500 pt-2">
                    {errors.description.message}
                  </p>
                )}
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
                style={{ display: "none" }}
                disabled={isFetch ? "disabled" : ""}
                ref={inputFileImage}
                onChange={(e) => handleChange(e)}
              />

              <div className="w-full h-auto relative flex-row gap-2 flex items-center pt-2">
                <div
                  onClick={upLoad}
                  className="w-full h-40 relative z-0 flex text-gray-700 flex-col justify-center items-center rounded h-passport border-2 border-dashed bg-white backdrop-filter bg-opacity-20 backdrop-blur-lg"
                >
                  <div className="w-36 h-36 relative z-40 flex justify-center items-center">
                    {imageFile !== "" ? (
                      <Image layout="fill" src={imageFile} unoptimized={true} />
                    ) : globalCtx.isFetch ? (
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

                        <p className="font-light text-xs text-gray-400 text-center px-3">
                          Drop here or click here
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <span className="text-gray-400 text-xs">
                *Format picture recomand 1x1
              </span>
              <div className="w-full h-auto relative py-3 flex justify-end gap-1">
                <div className="w-full h-auto flex justify-end gap-2">
                  <button
                    type="submit"
                    onClick={() =>
                      setValue(
                        "pict",
                        imageFile !== "" ? imageFile : "/img/user-default.png"
                      )
                    }
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
};

export default memo(FormContent);
