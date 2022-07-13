import {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  memo,
  useRef,
} from "react";
import { getLayout } from "components/layout/Navbar";
import { useForm } from "react-hook-form";
import { GlobalContext } from "context/global";
import AddContent from "components/card/AddContent";
import ContentTable from "components/table/Content";
import ContentUpdateModal from "components/modal/ContentUpdate";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { getContent, checkUid, getTotalContent } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  query,
}) {
  var user = await req.session.user;
  if (!user || !user.access_token) {
    return retObject({ isLogin: false });
  }

  const validationToken = await checkerToken(user);
  if (validationToken.error) {
    await req.session.destroy();
    return redirect("/");
  }

  if (validationToken.status === "refresh") {
    user = {
      isLoggedIn: true,
      access_token: validationToken.access_token,
      refresh_token: validationToken.refresh_token,
    };
    req.session.user = user;
    await req.session.save();
  }

  const uid = JSON.parse(atob(user.access_token.split(".")[1]));
  const checkUids = await checkUid(uid.user_id);

  // naaaaa

  const content = await getContent();
  const totalContent = await getTotalContent();

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    content: content,
    totalContent: totalContent,
  });
},
sessionOptions);

const FormContent = memo(() => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();
  const {
    reset,
    trigger,
    isFetch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [method, setMethod] = useState(false);

  const clickRef = useRef(null);

  const onSubmit = useCallback(async (data) => {
    const body = {
      pict: [],
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

      await router.replace("/dashboardSKI/content");
      await reset();
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

  const Update = useCallback(async (data) => {
    const body = {
      pict: [],
      key: data.key,
      title: data.title,
      label: data.label,
      type: parseInt(data.type),
      description: data.description,
      uri: "content/update",
    };

    console.log("update content", body);

    try {
      await fetchJson("/api/prot/put", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await router.replace("/dashboardSKI/content");
      await reset();
      // globalAct.setModal("");
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
      <div className="">
        <form onSubmit={handleSubmit(method ? Update : onSubmit)} className="">
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
                  <p className="text-sm font-bold text-red-600 mb-2">
                    Position
                  </p>
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

                <div className="w-full h-auto relative">
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
                  // ref={inputFileImage}
                  // onChange={(e) => handleImage(e)}
                  {...register("pict", {
                    required: {
                      value: false,
                      message: "pict",
                    },
                  })}
                />

                <div className="w-full h-auto relative flex-row gap-2 flex items-center pt-2">
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

                <div className="w-full h-auto relative px-4 py-3 justify-end gap-1 hidden">
                  <div className="w-full h-auto flex justify-end gap-2">
                    <button
                      ref={clickRef}
                      type="submit"
                      onClick={() => setValue("pict", [])}
                      disabled={globalCtx.isFetch ? "disabled" : ""}
                      className="px-6 h-8 bg-green-500 text-white font-semibold rounded overflow-hidden"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className={"flex flex-row items-center gap-x-4 px-3"}>
          <button
            className="bg-red-500 w-24 h-10 text-white rounded-md"
            onClick={() => {
              setMethod(false);
              reset({
                key: "",
                title: "",
                description: "",
                pict: [],
                type: 1,
                label: "",
              });
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-500 w-24 h-10 text-white rounded-md"
            onClick={() => clickRef.current.click()}
          >
            Save
          </button>
        </div>
      </div>

      <ManageContent
        setMethod={setMethod}
        clickRef={clickRef}
        reset={reset}
        onSubmit={onSubmit}
        Update={Update}
      />
    </div>
  );
});

const ManageContent = (props) => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();
  const [data, setData] = useState(props.content);
  const [totalRows, setTotalRows] = useState(props.totalCat);
  const [perPage, setPerPage] = useState(10);

  const { modal } = globalCtx;

  useEffect(() => {
    globalAct.setFullname(props.fullName);
    globalAct.setAdminMode("ski");
  }, []);

  const handlePageChange = useCallback((page) => {
    fetchData((page - 1) * perPage, perPage);
  }, []);

  const handlePerRowsChange = useCallback((newPerPage, page) => {
    setPerPage(newPerPage);
    fetchData(0, newPerPage);
  }, []);

  const fetchData = useCallback(async (start, page) => {
    globalAct.setIsFetch(true);
    const body = {
      uri: "content",
      start: start,
      length: page,
    };
    try {
      const res = await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setData(res.data);
      setTotalRows(res.total);
      setPerPage(page);
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
    <div className="w-full p-3 flex flex-col gap-y-2">
      <div>
        {useMemo(() => {
          return (
            <ContentTable
              setMethod={props.setMethod}
              method={props.method}
              reset={props.reset}
              data={data}
              totalRows={totalRows}
              handlePageChange={handlePageChange}
              handlePerRowsChange={handlePerRowsChange}
            />
          );
        }, [data])}
      </div>
    </div>
  );
};

export default FormContent;
FormContent.getLayout = getLayout;
