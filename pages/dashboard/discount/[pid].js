import { getLayout } from "components/layout/Navbar";
import { useRouter } from "next/router";
import { sessionOptions } from "lib/session";
import { useContext, useEffect, useMemo } from "react";
import { withIronSessionSsr } from "iron-session/next";
import {
  checkUid,
  findOutlet,
  getListProduct,
  getOutletByShortname,
} from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import { GlobalContext } from "context/global";
import DiscountTable from "components/table/Discount";
import FormDiscount from "components/form/FormDiscount";

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

  const keyOutlet = await getOutletByShortname(query.pid);
  const listProduct = await getListProduct(keyOutlet[0].key);

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    adminMode: outlet.length > 0 ? outlet[0]?.shortname : query.pid,
    ski: checkUids[0].outlet !== "" ? false : true,
    outletPict: "/img/ski.png",
    listProduct: listProduct,
  });
},
sessionOptions);

const ManageVoucher = (props) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    globalAct.setAdminMode("outlet");
    globalAct.setFullname(props.fullName);
    globalAct.setIsFetch(false);
    globalAct.setErrorMsg("");
    globalAct.setSki(props.ski);
    globalAct.setCurrentBrand(props.adminMode);
    globalAct.setOutletPict(props.outletPict);
  }, []);

  useEffect(() => {
    console.log("fetch data status : ", globalCtx.isFetch);
  }, [globalCtx]);

  return (
    <div className="w-full p-4 flex flex-col gap-y-2">
      {useMemo(
        () => (
          <FormDiscount listProduct={props.listProduct} />
        ),
        []
      )}
      {useMemo(
        () => (
          <DiscountTable />
        ),
        []
      )}
    </div>
  );
};

export default ManageVoucher;
ManageVoucher.getLayout = getLayout;
