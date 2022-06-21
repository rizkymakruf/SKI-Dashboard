import { useContext, useState } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import ProdukRekomenTable from "components/table/ProdukRekomen";
import ProdukRekomenListTable from "components/table/ProdukRekomenList";
import SearchProduct from "components/search/Product";

const ManageProdukRekomen = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  return (
    <div className="w-full p-3 flex flex-col gap-y-2">
      <div className="border-2 border-orange-200 rounded-md p-5 shadow-md mb-3">
        <ProdukRekomenTable />
      </div>
      <div className="mb-3">
        <SearchProduct />
      </div>
      <div className="bg-white border border-gray-200 rounded-md p-5 shadow-md">
        <ProdukRekomenListTable />
      </div>
    </div>
  );
};

export default ManageProdukRekomen;
ManageProdukRekomen.getLayout = getLayout;
