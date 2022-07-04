import { useContext, useEffect, useState } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { topBrand, listBrand, checkUid } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";
import TopBrandTable from "components/table/TopBrand";
import SearchBrand from "components/search/Brand";
import TopBrandListTable from "components/table/TopBrandList";

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

  const tbrand = await topBrand();
  const brand = await listBrand();

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    tbrand: tbrand,
    brand: brand,
  });
},
sessionOptions);

const ManageTopBrand = (props) => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const [data, setData] = useState(props.tbrand);

  // console.log(props.category);

  useEffect(() => {
    globalAct.setSelectedData(props.tbrand);
  }, []);

  return (
    <div className="w-full p-3 flex flex-col gap-y-2">
      <div className="border-2 border-orange-200 rounded-md p-5 shadow-md mb-3">
        <TopBrandTable
          globalAct={globalAct}
          globalCtx={globalCtx}
          tbrand={data}
        />
      </div>
      <div className="bg-white border border-gray-200 rounded-md p-5 shadow-md">
        <TopBrandListTable
          globalAct={globalAct}
          globalCtx={globalCtx}
          brand={data}
        />
      </div>
    </div>
  );
};

export default ManageTopBrand;
ManageTopBrand.getLayout = getLayout;
