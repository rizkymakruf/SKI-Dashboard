import { useContext, useState } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import FormCategory from "components/form/FormCategory";
import SearchCategory from "components/search/Category";
import CategoryTable from "components/table/Category";

import { FetchError } from "lib/listFunct";

const ManageCategory = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="w-full p-2 flex flex-col gap-y-2">
      <div>
        <FormCategory
          // Default Form
          globalAct={globalAct}
          globalCtx={globalCtx}
          onSubmit={async function handleSubmit(e) {
            e.preventDefault();
            globalAct.setIsFetch(true);

            const body = {
              method: "add",
              category: e.currentTarget.category.value,
              uri: "category",
            };
            console.log(body);

            try {
              await fetchJson("/api/prot/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              });
              router.replace("/dashboard/category");
            } catch (error) {
              if (error instanceof FetchError) {
                globalAct.setErrorMsg(error.data.message);
              } else {
                globalAct.setErrorMsg("An unexpected error happened");
              }
            }

            globalAct.setIsFetch(false);
          }}
        />
      </div>
      {/* <div>
        <SearchCategory />
      </div> */}
      <div>
        <CategoryTable />
      </div>
    </div>
  );
};

export default ManageCategory;
ManageCategory.getLayout = getLayout;
