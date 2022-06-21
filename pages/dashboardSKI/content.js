import { useContext, useState } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import AddContent from "components/card/AddContent";
import ContentTable from "components/table/Content";

const ManageContent = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  return (
    <div className="w-full p-2 flex flex-col gap-y-2">
      <div>
        <AddContent
          globalAct={globalAct}
          globalCtx={globalCtx}
          // Default Form
          //   globalAct={globalAct}
          //   globalCtx={globalCtx}
          //   onSubmit={async function handleSubmit(e) {
          //     e.preventDefault();
          //     globalAct.setIsFetch(true);

          //     const body = {
          //       method: "add",
          //       category: e.currentTarget.category.value,
          //       uri: "cat/addcategory",
          //     };

          //     console.log(body);

          //     try {
          //       await fetchJson("/api/prot/post", {
          //         method: "POST",
          //         headers: { "Content-Type": "application/json" },
          //         body: JSON.stringify(body),
          //       });
          //       router.replace("/dashboard/category");
          //     } catch (error) {
          //       if (error instanceof FetchError) {
          //         globalAct.setErrorMsg(error.data.message);
          //       } else {
          //         console.log(error);
          //         globalAct.setErrorMsg("An unexpected error happened");
          //       }
          //     }
          //     globalAct.setIsFetch(false);
          //   }}
        />
      </div>
      <div>
        <ContentTable />
      </div>
    </div>
  );
};

export default ManageContent;
ManageContent.getLayout = getLayout;
