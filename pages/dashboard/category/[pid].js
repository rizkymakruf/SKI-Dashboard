import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { GlobalContext } from "context/global";
import { getLayout } from "components/layout/Navbar";
import CategoryTable from "components/table/Category";
import fetchJson, { FetchError } from "lib/fetchJson";
import SearchCategory from "components/search/Categoy";
import FormCategory from "components/form/FormUpdateCategory";

const ManageCategory = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
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
