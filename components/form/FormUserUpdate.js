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
import Image from "next/image";
import { uploadFile } from "lib/imageK";

const FormUserUpdate = () => {
  const inputFileImage = useRef(null);
  const [imageFile, setImageFile] = useState("");

  const upLoad = useCallback(() => {
    inputFileImage.current.click();
  }, []);

  const handleChange = useCallback(async (e) => {
    globalAct.setIsFetch(true);
    const file = e.target.files[0];
    const typeFile = file.type.split("/")[1];
    const a = await uploadFile(file, `outlet.${typeFile}`, "outlet");
    globalAct.setSelectedData({ ...globalCtx.selectedData, pict: a.url });
    globalAct.setIsFetch(false);
  });

  const {
    reset,
    trigger,
    isFetch,
    setValue,
    getValues,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    setImageFile(globalCtx.selectedData?.pict);
    reset();
  }, [globalCtx.selectedData]);

  const onSubmit = useCallback(async (data) => {
    const body = {
      pict: data.pict,
      key: data.key,
      email: data.email,
      phone: data.phone,
      outlet: data.outlet,
      address: data.address,
      username: data.username,
      fullname: data.fullname,
      password: data.password,
      uri: "user/update",
    };

    console.log("update admin", body);

    try {
      const res = await fetchJson("/api/prot/put", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await router.replace("/dashboardSKI/admins");
      reset();
      globalAct.setModal("");
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full h-full grid grid-cols-2 gap-4 select-none p-5">
            <div className="w-full space-y-2">
              <input
                name="key"
                defaultValue={globalCtx.selectedData.key}
                {...register("key", { required: true })}
                type="hidden"
              ></input>
              <div className="w-full">
                <p>Username</p>
                <input
                  name="username"
                  autocomplete="off"
                  defaultValue={globalCtx.selectedData.username}
                  placeholder={globalCtx.selectedData.username}
                  className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
                    errors.username
                      ? "focus:outline-red-500 border-2 border-red-500"
                      : null
                  }`}
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Short name outlet harus di isi!",
                    },
                    minLength: {
                      value: 3,
                      message: "Short name minimal 3 karakter!",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Format username tidak sesuai!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("username");
                  }}
                ></input>

                {errors.username && (
                  <p className="text-xs text-red-500 pt-2">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <p>Fullname</p>
                <input
                  name="fullname"
                  autocomplete="off"
                  defaultValue={globalCtx.selectedData.fullname}
                  placeholder={globalCtx.selectedData.fullname}
                  className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
                    errors.fullname
                      ? "focus:outline-red-500 border-2 border-red-500"
                      : null
                  }`}
                  {...register("fullname", {
                    required: {
                      value: true,
                      message: "Fullname harus di isi!",
                    },
                    minLength: {
                      value: 3,
                      message: "Fullname minimal 3 karakter!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("fullname");
                  }}
                ></input>

                {errors.fullname && (
                  <p className="text-xs text-red-500 pt-2">
                    {errors.fullname.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <p>Email</p>
                <input
                  name="email"
                  autocomplete="off"
                  defaultValue={globalCtx.selectedData.email}
                  placeholder={globalCtx.selectedData.email}
                  className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-blue-500 ${
                    errors.email
                      ? "focus:outline-red-500 border-2 border-red-500"
                      : null
                  }`}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email harus di isi!",
                    },
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Format email tidak sesuai!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("email");
                  }}
                ></input>

                {errors.email && (
                  <p className="text-xs text-red-500 pt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <p>Phone Number</p>
                <input
                  name="phone"
                  autocomplete="off"
                  defaultValue={globalCtx.selectedData.phone}
                  placeholder={globalCtx.selectedData.phone}
                  className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-none ${
                    errors.phone
                      ? "focus:border-red-500 border-red-500 focus:ring-0"
                      : null
                  }`}
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Nomor hp harus di isi!",
                    },
                    minLength: {
                      value: 11,
                      message: "Nomor hp minimal 11 karakter!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("phone");
                  }}
                ></input>

                {errors.phone && (
                  <p className="text-xs text-red-500 pt-2">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <p>Outlet</p>
                <select
                  name="outlet"
                  autocomplete="off"
                  className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-none ${
                    errors.outlet
                      ? "focus:border-red-500 border-red-500 focus:ring-0"
                      : null
                  }`}
                  {...register("outlet", {
                    required: {
                      value: true,
                      message: "",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("outlet");
                  }}
                >
                  {globalCtx.listOutlet.map((dat, idx) => {
                    return (
                      <option
                        selected={globalCtx.selectedData.outlet?.key == dat.key}
                        value={dat.key}
                      >
                        {dat.name}
                      </option>
                    );
                  })}
                </select>

                {errors.outlet && (
                  <p className="text-xs text-red-500 pt-2">
                    {errors.outlet.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="w-full">
                <p>Alamat</p>
                <textarea
                  name="address"
                  defaultValue={globalCtx.selectedData.address}
                  placeholder={globalCtx.selectedData.address}
                  className={`rounded-md p-1 border-2  border-orange-500/50 w-full h-32 focus:outline-none ${
                    errors.address
                      ? "focus:border-red-500 border-red-500 focus:ring-0"
                      : null
                  }`}
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Alamat harus di isi!",
                    },
                    maxLength: {
                      value: 120,
                      message: "Alamat maximal 100 karakter!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("address");
                  }}
                ></textarea>

                {errors.address && (
                  <p className="text-xs text-red-500 pt-2">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="w-full h-auto relative pt-2">
                <p>Foto user</p>
                <input
                  accept="image/png, image/gif, image/jpeg"
                  type="file"
                  name="pict"
                  id="fileContract"
                  ref={inputFileImage}
                  onChange={(e) => handleChange(e)}
                  style={{ display: "none" }}
                  disabled={isFetch ? "disabled" : ""}
                />

                <div className="w-full h-auto relative flex-row gap-2 flex items-center  pt-2">
                  <div
                    onClick={upLoad}
                    className="w-full h-32 relative z-0 flex text-gray-700 flex-col justify-center items-center rounded h-passport border-2 border-dashed bg-white backdrop-filter bg-opacity-20 backdrop-blur-lg"
                  >
                    {globalCtx.selectedData?.pict === "" &&
                    globalCtx.isFetch ? (
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
                    ) : globalCtx.selectedData?.pict === "" &&
                      !globalCtx.isFetch ? (
                      <>
                        <h3 className="text-gray-700">
                          <i className="fas fa-cloud-download-alt"></i>
                        </h3>

                        <p className="font-light text-xs text-black text-center px-3">
                          Drop here or click here
                        </p>
                      </>
                    ) : (
                      globalCtx.selectedData !== "" && (
                        // <Image
                        //   layout="fill"
                        //   width={100}
                        //   height={100}
                        //   src={globalCtx.selectedData?.pict}
                        // />
                        <div></div>
                      )
                    )}
                  </div>
                </div>
                <div className="w-full h-auto relative px-4 py-3 flex justify-end gap-1">
                  <div className="w-full h-auto flex justify-end gap-2">
                    <button
                      type="submit"
                      onClick={() => {
                        setValue("key", globalCtx.selectedData.key),
                          setValue("pict", imageFile);
                      }}
                      disabled={globalCtx.isFetch ? "disabled" : ""}
                      className="px-6 h-8 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default memo(FormUserUpdate);
