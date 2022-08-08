import { getLayout } from "components/layout/Navbar";
import { useRouter } from "next/router";
import { sessionOptions } from "lib/session";
import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { checkUid, findOutlet } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import { GlobalContext } from "context/global";
import HistoryTable from "components/table/History";
import FormHistory from "components/form/FormHistory";
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

const History = (props) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const router = useRouter();
  const [history, setHistory] = useState(false);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [newBody, setNewBody] = useState({});

  useEffect(() => {
    globalAct.setAdminMode("outlet");
    globalAct.setFullname(props.fullName);
    globalAct.setIsFetch(false);
    globalAct.setErrorMsg("");
    globalAct.setSki(props.ski);
    globalAct.setCurrentBrand(props.adminMode);
    globalAct.setOutletPict(props.outletPict);
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
    <div className="w-full p-2 flex flex-col gap-y-2">
      <div>
        <FormHistory
          setData={setData}
          setHistory={setHistory}
          setNewBody={setNewBody}
          setTotalRows={setTotalRows}
          currentBrand={props.adminMode}
        />
      </div>
      {history && (
        <div>
          <HistoryTable
            data={data}
            totalRows={totalRows}
            handlePageChange={handlePageChange}
            handlePerRowsChange={handlePerRowsChange}
          />
        </div>
      )}
    </div>
  );
};

export default History;
History.getLayout = getLayout;
