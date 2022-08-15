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
    // retObject({ isLogin: false });
    return redirect("/");
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

  global.atob = require("atob");

  const uid = JSON.parse(atob(user.access_token.split(".")[1]));
  const checkUids = await checkUid(uid.user_id);

  if (checkUids[0].outlet !== "") {
    return redirect("/");
  }

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    pict:
      checkUids[0].pict !== "" ? checkUids[0].pict : "/img/user-default.png",
    outletPict: "/img/ski.png",
  });
},
sessionOptions);

const ManageReport = (props) => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const [mode, setMode] = useState("");
  const [dataReport, setDataReport] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const router = useRouter();
  let newBody;

  useEffect(() => {
    globalAct.setFullname(props.fullName);
    globalAct.setUserPict(props.pict);
    globalAct.setOutletPict(props.outletPict);
    globalAct.setAdminMode("ski");
  }, []);

  const handlePageChange = useCallback((page) => {
    // setNewBody({ ...newBody, index: (page - 1) * perPage });
    fetchData((page - 1) * perPage, perPage);
  }, []);

  const handlePerRowsChange = useCallback((newPerPage, page) => {
    setPerPage(newPerPage);
    // setNewBody({ ...newBody, index: 0, length: newPerPage });
    fetchData(0, newPerPage);
  }, []);

  useEffect(() => {
    console.log("halo", newBody);
  }, [newBody]);

  const fetchData = useCallback(async (index, length) => {
    console.log("new body", newBody);

    globalAct.setIsFetch(true);
    const body = {
      uri: "report",
      start: newBody.start,
      end: newBody.end,
      method: newBody.method,
      index: index,
      length: length,
    };
    try {
      const res = await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setMode(newBody.method);
      console.log(res);
      setDataReport(res.data);
      setTotalRows(res.total);
    } catch (error) {
      console.log("error", error);
      if (error instanceof FetchError) {
        console.log("error", error.data.message);
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
        {useMemo(() => {
          console.log("form");
          return (
            <FormReport
              onSubmit={async (e) => {
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
                console.log(newBody);
                // console.log(body);
                try {
                  const res = await fetchJson("/api/prot/post", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                  });
                  console.log(res);
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
                newBody = body;

                globalAct.setIsFetch(false);
              }}
            />
          );
        }, [])}
      </div>
      {useMemo(() => {
        console.log("tabel");
        return (
          <div
            className={`${
              mode === "" ? "hidden" : "block"
            } bg-white rounded-md p-5 shadow-md border-2 border-gray-200`}
          >
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
        );
      }, [dataReport, mode])}
    </div>
  );
};

export default ManageReport;
ManageReport.getLayout = getLayout;
