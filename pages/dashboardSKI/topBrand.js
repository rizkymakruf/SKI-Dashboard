import { useContext, useState } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import TopBrandTable from "components/table/TopBrand";
import SearchBrand from "components/search/Brand";
import TopBrandListTable from "components/table/TopBrandList";

const ManageTopBrand = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  return (
    <div className="w-full p-3 flex flex-col gap-y-2">
      <div className="border-2 border-orange-200 rounded-md p-5 shadow-md mb-3">
        <TopBrandTable />
      </div>
      <div className="mb-3">
        <SearchBrand />
      </div>
      <div className="bg-white border border-gray-200 rounded-md p-5 shadow-md">
        <TopBrandListTable />
      </div>
    </div>
  );
};

export default ManageTopBrand;
ManageTopBrand.getLayout = getLayout;
