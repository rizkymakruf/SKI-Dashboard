import { useContext, useEffect, useState } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";
import ProdukRekomenTable from "components/table/ProdukRekomen";
import ProdukRekomenListTable from "components/table/ProdukRekomenList";
import SearchProduct from "components/search/Product";

import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { getProducts, getProductsRecomd, checkUid } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";

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

  const product = await getProducts();
  const recomd = await getProductsRecomd();

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    product: product,
    recomd: recomd,
  });
},
sessionOptions);

const ManageProdukRekomen = (props) => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const [data, setData] = useState(props.product);
  const [recomd, setRecomd] = useState(props.recomd);

  // console.log(props.category);

  useEffect(() => {
    globalAct.setSelectedData(props.product);
    globalAct.setSelectedData(props.recomd);
  }, []);
  return (
    <div className="w-full flex flex-col p-5">
      <div className="w-full p-4 border border-gray-200 rounded-md shadow-md">
        <SearchProduct />
        <div className="flex gap-6 my-4">
          <ProdukRekomenListTable
            globalAct={globalAct}
            globalCtx={globalCtx}
            product={data}
          />
          <ProdukRekomenTable
            globalAct={globalAct}
            globalCtx={globalCtx}
            recomd={recomd}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageProdukRekomen;
ManageProdukRekomen.getLayout = getLayout;
