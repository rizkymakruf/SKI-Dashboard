// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░███████░██░░░░░██░██░░░░░█░█████████░██████████░░░░░░░
// ░█░░░░░░░█░██░██░█░█░█░░░░█░█░░░░░░░█░░░░░█░░░░░░░░░░░░
// ░█░░░░░░░█░░░█░░░█░█░░█░░░█░█░░░░░░░█░░░░░█░░░░░░░░░░░░
// ░█░░░░░░░█░░░░░░░█░█░░░█░░█░█░░░░░░░░░░░░░█░░░░░░░░░░░░
// ░███████░█░░░░░░░█░█░░░░█░█░█░░░░░░░░░░░░░█░░░░░░░░░░░░
// ░░░░░░░█░█░░░░░░░█░█░░░░░██░█░░░█████░░░░░█░░░░░░░░░░░░
// ░░░░░░░█░█░░░░░░░█░█░░░░░░█░█░░░░░░░█░░░░░█░░░░░░░░░░░░
// ░░░░░░░█░█░░░░░░░█░█░░░░░░█░█░░░░░░░█░░░░░█░░░░░░░░░░░░
// ░███████░█░░░░░░░█░█░░░░░░█░█████████░░░░░█░░░░░░░░░░░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░██░░░██░░░░░█░░░░░█████░░░░██████░░░░░░░░░░░░░░░░░░░░░
// ░█░█░█░█░░░░█░█░░░░█░░░░█░░░█░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░█░░█░░█░░░█░░░█░░░█░░░░░█░░████░░░░░░░░░░░░░░░░░░░░░░░
// ░█░░░░░█░░█░███░█░░█░░░░█░░░█░░░░░░░░░░░░░░░░░░░░░░░░░░
// ░█░░░░░█░█░░░░░░░█░█████░░░░██████░░░░░░░░░░░░░░░░░░░░░
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

import {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  memo,
} from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import FormReport from "components/form/FormReport";
import ViewReportByBrandTable from "components/table/ViewReportByBrand";
import ViewReportByCategoryTable from "components/table/ViewReportByCategory";
import ViewReportByProductTable from "components/table/ViewReportByProduct";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { allUsers, getOutlet, checkUid } from "lib/arangoDb";
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

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
  });
},
sessionOptions);

const FormData = memo(() => {
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
  const onSubmit = useCallback(async (data) => {
    // const body = {
    //   pict: [],
    //   title: data.title,
    //   label: data.label,
    //   type: parseInt(data.type),
    //   description: data.description,
    //   uri: "content/add",
    // };

    console.log("add content", data.start);

    // try {
    //   await fetchJson("/api/prot/post", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(body),
    //   });

    //   await router.replace("/dashboardSKI/content");
    //   await reset();
    // } catch (error) {
    //   if (error instanceof FetchError) {
    //     globalAct.setErrorMsg(error.data.message);
    //   } else {
    //     console.log(error);
    //     globalAct.setErrorMsg("An unexpected error happened");
    //   }
    // }

    // globalAct.setIsFetch(false);
  }, []);

  return (
    <div className="w-full h-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-full grid grid-cols-1 gap-4 select-none p-3">
          <div className="w-full space-y-2">
            <div className="w-full">
              <p>Report Filter</p>
              <select
                name="report"
                id="report"
                className="w-full rounded-md border-2 border-orange-500/50"
                onKeyUp={() => {
                  trigger("report");
                }}
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
                onKeyUp={() => {
                  trigger("start");
                }}
                className="w-full rounded-md border-2 border-orange-500/50 bg-orange-300"
              ></input>
            </div>
            <div className="w-full">
              <p>Date To</p>
              <input
                name="end"
                id="end"
                type={"date"}
                onKeyUp={() => {
                  trigger("end");
                }}
                className="w-full rounded-md border-2 border-orange-500/50 bg-orange-300"
              ></input>
            </div>

            <div className="w-full h-auto relative py-6 flex justify-end gap-1">
              <div className="w-full h-auto flex justify-end gap-2">
                <button
                  type={"submit"}
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
  );
});

const ManageReport = (props) => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const [mode, setMode] = useState("");
  const [dataReport, setDataReport] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const router = useRouter();
  const [newBody, setNewBody] = useState({});

  useEffect(() => {
    globalAct.setFullname(props.fullName);
    globalAct.setAdminMode("ski");
  }, []);

  const handlePageChange = useCallback((page) => {
    setNewBody({ ...newBody, index: (page - 1) * perPage });
    fetchData();
  }, []);

  const handlePerRowsChange = useCallback((newPerPage, page) => {
    setPerPage(newPerPage);
    setNewBody({ ...newBody, index: 0, length: newPerPage });
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    globalAct.setIsFetch(true);
    try {
      const res = await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBody),
      });
      setMode(newBody.method);
      setDataReport(res.data);
      setTotalRows(res.total);
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
    <div className="w-full p-3 flex flex-col gap-y-2 space-y-3">
      <div className="bg-white rounded-md p-5 shadow-md border-2 border-gray-200">
        <p className="text-orange-500 text-lg font-bold p-3">Report</p>
        <hr />

        <FormData />
      </div>
      {/* {useMemo(() => {
        return ( */}
      {mode !== "" && (
        <div className="bg-white rounded-md p-5 shadow-md border-2 border-gray-200">
          <p className="text-red-500 py-2 text-lg font-bold">
            {mode === "brand"
              ? "Report By Brand"
              : mode === "category"
              ? "Report By Category"
              : mode === "product" && "Report By Product"}
          </p>
          {mode === "brand" ? (
            <ViewReportByBrandTable
              data={dataReport}
              totalRows={totalRows}
              handlePageChange={handlePageChange}
              handlePerRowsChange={handlePerRowsChange}
            />
          ) : mode === "category" ? (
            <ViewReportByCategoryTable
              data={dataReport}
              totalRows={totalRows}
              handlePageChange={handlePageChange}
              handlePerRowsChange={handlePerRowsChange}
            />
          ) : (
            mode === "product" && (
              <ViewReportByProductTable
                data={dataReport}
                totalRows={totalRows}
                handlePageChange={handlePageChange}
                handlePerRowsChange={handlePerRowsChange}
              />
            )
          )}
        </div>
      )}
      {/* );
       }, [dataReport, mode])} */}
    </div>
  );
};

export default ManageReport;
ManageReport.getLayout = getLayout;
