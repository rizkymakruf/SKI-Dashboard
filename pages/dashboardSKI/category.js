import { useContext, useEffect, useState } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import FormCategory from "components/form/FormCategory";
import SearchCategory from "components/search/Category";
import CategoryTable from "components/table/Category";

import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { mainCategory, checkUid } from "lib/arangoDb";
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

  // naaaaa

  const category = await mainCategory();

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    // access_token: user.access_token,
    fullName: checkUids[0].fullname,
    category: category,
  });
},
sessionOptions);

const ManageCategory = (props) => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const [data, setData] = useState(props.category);

  // console.log(props.category);

  useEffect(() => {
    globalAct.setSelectedData(props.category);
  }, []);

  return (
    <div className="w-full p-3 flex flex-col gap-y-2">
      <div>
        <FormCategory
          globalAct={globalAct}
          globalCtx={globalCtx}
          onSubmit={async function handleSubmit(e) {
            e.preventDefault();
            globalAct.setIsFetch(true);

            const body = {
              name: e.currentTarget.category.value,
              uri: "category/add",
            };

            try {
              await fetchJson("/api/prot/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              });
            } catch (error) {
              if (error instanceof FetchError) {
                globalAct.setErrorMsg(error.data.message);
              } else {
                console.log(error);
                globalAct.setErrorMsg("An unexpected error happened");
              }
            }
            router.replace("/dashboardSKI/category");
            globalAct.setIsFetch(false);
          }}
        />
      </div>
      <div>
        <SearchCategory
          globalAct={globalAct}
          globalCtx={globalCtx}
          setData={setData}
        />
      </div>
      <div>
        <CategoryTable
          globalAct={globalAct}
          globalCtx={globalCtx}
          category={data}
        />
      </div>
    </div>
  );
};

export default ManageCategory;
ManageCategory.getLayout = getLayout;
