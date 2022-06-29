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
    <div className="w-full flex flex-col p-5">
      <div className="w-full p-4 border border-gray-200 rounded-md shadow-md">
        <SearchProduct />
        <div className="flex gap-6 my-4">
          <ProdukRekomenListTable />
          <ProdukRekomenTable />
        </div>
      </div>
    </div>
  );
};

export default ManageProdukRekomen;
ManageProdukRekomen.getLayout = getLayout;
