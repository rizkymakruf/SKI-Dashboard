import FormReportOutlet from "components/form/FormReportOutlet";
import { getLayout } from "components/layout/Navbar";
import { useRouter } from "next/router";
import { sessionOptions } from "lib/session";
import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { checkUid, findOutlet } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import { GlobalContext } from "context/global";
import ViewReportByProductOutlet from "components/table/ViewReportByProductOutlet";
import fetchJson, { FetchError } from "lib/fetchJson";

// ssr
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

  const uid = JSON.parse(atob(user.access_token.split(".")[1]));
  const checkUids = await checkUid(uid.user_id);
  let outlet = [];
  if (checkUids[0].outlet !== "") {
    outlet = await findOutlet(checkUids[0]?.outlet);
    if (outlet[0].shortname !== query.pid) {
      return redirect("/");
    }
  }

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    adminMode: outlet.length > 0 ? outlet[0]?.shortname : query.pid,
    ski: checkUids[0].outlet !== "" ? false : true,
    outletPict: "/img/ski.png",
  });
},
sessionOptions);

const Report = (props) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const [dataReport, setDataReport] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const router = useRouter();
  const [newBody, setNewBody] = useState({});
  const [report, setReport] = useState(false);

  useEffect(() => {
    globalAct.setAdminMode("outlet");
    globalAct.setFullname(props.fullName);
    globalAct.setIsFetch(false);
    globalAct.setErrorMsg("");
    globalAct.setSki(props.ski);
    globalAct.setCurrentBrand(props.adminMode);
    globalAct.setOutletPict(props.outletPict);
  }, []);

  useEffect(() => {}, [newBody]);

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
    console.log("fetch", newBody);
    try {
      const res = await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBody),
      });
      console.log("report", res);
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
    <div className="w-full p-4  gap-y-2 space-y-3">
      {useMemo(() => {
        console.log("form");
        return (
          <div className="p-3 border border-gray-300 rounded-md hover:shadow-md">
            <FormReportOutlet
              currentBrand={props.adminMode}
              setDataReport={setDataReport}
              setNewBody={setNewBody}
              setTotalRows={setTotalRows}
              setReport={setReport}
            />
          </div>
        );
      }, [])}
      {report && (
        <div>
          <ViewReportByProductOutlet
            data={dataReport}
            totalRows={totalRows}
            handlePageChange={handlePageChange}
            handlePerRowsChange={handlePerRowsChange}
          />
        </div>
      )}
    </div>
  );
};

export default Report;
Report.getLayout = getLayout;
