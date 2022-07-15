import { useForm } from "react-hook-form";
import { useContext, memo, useCallback } from "react";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";

const FormUser = () => {
  // const [imageFile, setImageFile] = useState([]);
  // const inputFileImage = useRef(null);

  // const upLoad = (props, ref) => {
  //   inputFileImage.current.click();
  // };

  // const resetForm = (e) => {
  //   e.preventDefault();
  //   document.querySelector("form").reset();
  //   setSlide([]);
  //   setUpdate([]);
  // };

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

  const onSubmit = useCallback(async (data) => {
    const body = {
      username: data.username,
      fullname: data.fullname,
      address: data.address,
      password: data.password,
      email: data.email,
      phone: data.phone,
      outlet: data.outlet,
      pict: [],
      uri: "user/add",
    };

    console.log("add admin", body);

    try {
      const res = await fetchJson("/api/prot/post", {
        method: "POST",
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
            <div className="w-full space-y-1">
              <div className="w-full">
                <p>Username</p>
                <input
                  name="username"
                  autocomplete="off"
                  placeholder="Username"
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
                  placeholder="Fullname"
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
                  placeholder="Email"
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
                  type="number"
                  autocomplete="off"
                  placeholder="Phone"
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
                <p>Password</p>
                <input
                  name="password"
                  autocomplete="off"
                  type="password"
                  placeholder="Password"
                  className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-none ${
                    errors.password
                      ? "focus:border-red-500 border-red-500 focus:ring-0"
                      : null
                  }`}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password harus di isi!",
                    },
                    minLength: {
                      value: 8,
                      message: "Password minimal 8 karakter!",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("password");
                  }}
                ></input>

                {errors.password && (
                  <p className="text-xs text-red-500 pt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <p>Konfirmasi Password</p>
                <input
                  autocomplete="off"
                  type="password"
                  placeholder="Konfirmasi Password"
                  className={`rounded-md p-1 border-2  border-orange-500/50 w-full focus:outline-none ${
                    errors.confirmPassword
                      ? "focus:border-red-500 border-red-500 focus:ring-0"
                      : null
                  }`}
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "confirmPassword harus di isi!",
                    },
                    validate: (value) => {
                      const { password } = getValues();
                      return (
                        password === value || "Konfirmasi password harus sama!"
                      );
                    },
                  })}
                  onKeyUp={() => {
                    trigger("confirmPassword");
                  }}
                ></input>

                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 pt-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full space-y-1">
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
                      message: "Pilih outlet dulu !",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("outlet");
                  }}
                >
                  {globalCtx.listOutlet.map((dat, idx) => {
                    return <option value={dat.key}>{dat.name}</option>;
                  })}
                </select>

                {errors.outlet && (
                  <p className="text-xs text-red-500 pt-2">
                    {errors.outlet.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <p>Alamat</p>
                <textarea
                  name="address"
                  placeholder="Alamat lengkap"
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
                  style={{ display: "none" }}
                  disabled={isFetch ? "disabled" : ""}
                  // ref={inputFileImage}
                  // onChange={(e) => handleImage(e)}
                />

                <div className="w-full h-auto relative flex-row gap-2 flex items-center  pt-2">
                  <div
                    // onClick={upLoad}
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

                {/* {errorMessage && (
                  <p className="px-4 text-red-600">{errorMessage}</p>
                )} */}

                <div className="w-full h-auto relative px-4 py-3 flex justify-end gap-1">
                  <div className="w-full h-auto flex justify-end gap-2">
                    <button
                      className="px-6 h-8 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden"
                      type="submit"
                      onClick={() => setValue("pict", [])}
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
    </>
  );
};

export default memo(FormUser);
