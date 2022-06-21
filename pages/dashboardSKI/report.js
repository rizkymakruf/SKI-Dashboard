import { useContext, useState } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import VoucherTable from "components/table/Voucher";

const ManageReport = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  return (
    <div className="w-full p-3 flex flex-col gap-y-2">
      <div className="bg-white rounded-md p-5 shadow-md mb-3">
        <VoucherTable />
      </div>
    </div>
  );
};

export default ManageReport;
ManageReport.getLayout = getLayout;
