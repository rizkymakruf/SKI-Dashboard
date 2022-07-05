import { useContext, useState } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import fetchJson, { FetchError } from "lib/fetchJson";
import VoucherTable from "components/table/Voucher";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { getVoucher, checkUid, getTotalVoucher } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import { useRouter } from "next/router";

// ssr
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

  const voucher = await getVoucher();
  const totalVoucher = await getTotalVoucher();

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    voucher: voucher,
    totalVoucher: totalVoucher[0].total,
    adminMode: checkUids[0].outlet !== "" ? "outlet" : "ski",
  });
},
sessionOptions);

const ManageTopBrand = (props) => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();
  const [data, setData] = useState(props.voucher);

  const [totalRows, setTotalRows] = useState(props.totalVoucher);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    globalAct.setAdminMode(props.adminMode);
  }, []);

  const handlePageChange = (page) => {
    fetchData((page - 1) * perPage, perPage);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    fetchData(0, newPerPage);
  };

  const fetchData = async (start, page) => {
    globalAct.setIsFetch(true);
    const body = {
      uri: "voucher",
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
    } catch (error) {
      console.log("error", error);
      if (error instanceof FetchError) {
        globalAct.setErrorMsg(error.data.message);
      } else {
        globalAct.setErrorMsg("An unexpected error happened");
      }
    }
    globalAct.setIsFetch(false);
  };

  return (
    <div className="w-full p-3 flex flex-col gap-y-2">
      <div className="bg-white border border-gray-200 rounded-md p-5 shadow-md mb-3">
        <VoucherTable
          data={data}
          totalRows={totalRows}
          handlePageChange={handlePageChange}
          handlePerRowsChange={handlePerRowsChange}
        />
      </div>
    </div>
  );
};

export default ManageTopBrand;
ManageTopBrand.getLayout = getLayout;
