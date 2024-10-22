import { getLayout } from "components/layout/Navbar";
import { useRouter } from "next/router";
import { sessionOptions } from "lib/session";
import { useContext, useEffect } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { checkUid, findOutlet } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import { GlobalContext } from "context/global";
import FormVoucher from "components/form/FormVoucher";
import VoucherTabel from "components/table/VoucherTabel";

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
    globalAct.setCurrentBrand(props.adminMode);
  }, []);

  useEffect(() => {
    console.log("fetch data status : ", globalCtx.isFetch);
  }, [globalCtx]);

  return (
    <div className="w-full p-4 flex flex-col gap-y-2">
      <FormVoucher />
      <VoucherTabel />
    </div>
  );
};

export default ManageVoucher;
ManageVoucher.getLayout = getLayout;
