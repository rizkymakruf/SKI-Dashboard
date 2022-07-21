import { useContext, useState, useEffect, useMemo, useCallback } from "react";
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

  // naaaaa
  if (checkUids[0].outlet !== "") {
    return redirect("/");
  }

  const voucher = await getVoucher(
    query.start ? parseInt(query.start) : 0,
    query.length ? parseInt(query.length) : 10
  );
  const totalVoucher = await getTotalVoucher();

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    pict:
      checkUids[0].pict !== "" ? checkUids[0].pict : "/img/user-default.png",
    outletPict: "/img/ski.png",
    voucher: voucher,
    totalVoucher: totalVoucher[0].total,
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
    globalAct.setAdminMode("ski");
    globalAct.setFullname(props.fullName);
    globalAct.setUserPict(props.pict);
    globalAct.setOutletPict(props.outletPict);
  }, []);

  return (
    <div className="w-full p-3 flex flex-col gap-y-2">
      <div className="bg-white border border-gray-200 rounded-md p-5 shadow-md mb-3">
        {useMemo(() => {
          return (
            <VoucherTable
              data={data}
              totalRows={totalRows}
              handlePageChange={(page) => {
                router.replace(
                  `/dashboardSKI/vouchers?start=${
                    (page - 1) * perPage
                  }&length=${perPage}`
                );
              }}
              handlePerRowsChange={(newpage) => {
                setPerPage(newpage);
                router.replace(
                  `/dashboardSKI/vouchers?start=0&length=${newpage}`
                );
              }}
            />
          );
        }, [data])}
      </div>
    </div>
  );
};

export default ManageTopBrand;
ManageTopBrand.getLayout = getLayout;
