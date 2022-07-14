import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { GlobalContext } from "context/global";
import { getLayout } from "components/layout/Navbar";
import CategoryTable from "components/table/Category";
import fetchJson, { FetchError } from "lib/fetchJson";
import SearchCategory from "components/search/Categoy";
import FormCategory from "components/form/FormUpdateCategory";
import { checkUid, findOutlet } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";

// ssr
export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
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
  let outlet = [];
  if (checkUids[0].outlet != "") {
    outlet = await findOutlet(checkUids[0]?.outlet);
  }
  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    adminMode: outlet.length > 0 ? outlet[0]?.shortname : "",
  });
}, sessionOptions);
// end-ssr

const ManageCategory = (props) => {
  const router = useRouter();
  {
    /* Default */
  }
  const { globalCtx, globalAct } = useContext(GlobalContext);
  useEffect(() => {
    globalAct.setAdminMode("outlet");
    globalAct.setFullname(props.fullName);
    globalAct.setIsFetch(false);
    globalAct.setErrorMsg("");
  }, []);
  useEffect(() => {
    console.log("fetch data status : ", globalCtx.isFetch);
  }, [globalCtx]);

  return (
    <div className="w-full p-2 flex flex-col gap-y-2">
      <div>
        <FormCategory />
      </div>
      <div>
        <SearchCategory />
      </div>
      <div>
        <CategoryTable />
      </div>
    </div>
  );
};

export default ManageCategory;
ManageCategory.getLayout = getLayout;
