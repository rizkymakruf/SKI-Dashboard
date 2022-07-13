import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
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
        {/* {useMemo(() => { */}
        {/* return ( */}
        <FormReport
          onSubmit={async function handleSubmit(e) {
            e.preventDefault();
            globalAct.setIsFetch(true);
            const startDate = new Date(e.currentTarget.start.value);
            const endDate = new Date(e.currentTarget.end.value);
            const body = {
              method: e.currentTarget.report.value,
              start: startDate.getTime() / 1000,
              end: endDate.getTime() / 1000,
              index: 0,
              length: perPage,
              uri: "report",
            };

            setNewBody(body);

            try {
              const res = await fetchJson("/api/prot/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              });
              setMode(body.method);
              console.log(res.data);
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
          }}
        />
        {/* );
        }, [])} */}
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
