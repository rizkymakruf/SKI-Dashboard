import { useContext, useState } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";
import FormReport from "components/form/FormReport";
import ViewReportByBrandTable from "components/table/ViewReportByBrand";
import ViewReportByCategoryTable from "components/table/ViewReportByCategory";
import ViewReportByProductTable from "components/table/ViewReportByProduct";

const ManageReport = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  return (
    <div className="w-full p-3 flex flex-col gap-y-2 space-y-3">
      <div className="bg-white rounded-md p-5 shadow-md border-2 border-gray-200">
        <p className="text-orange-500 text-lg font-bold p-3">Report</p>
        <hr />
        <FormReport />
      </div>
      <div className="bg-white rounded-md p-5 shadow-md border-2 border-gray-200">
        <p className="text-red-500 py-2 text-lg font-bold">Report By Brand</p>
        <ViewReportByBrandTable />
      </div>
      <div className="bg-white rounded-md p-5 shadow-md border-2 border-gray-200">
        <p className="text-red-500 py-2 text-lg font-bold">
          Report By Category
        </p>
        <ViewReportByCategoryTable />
      </div>
      <div className="bg-white rounded-md p-5 shadow-md border-2 border-gray-200">
        <p className="text-red-500 py-2 text-lg font-bold">Report By Product</p>
        <ViewReportByProductTable />
      </div>
    </div>
  );
};

export default ManageReport;
ManageReport.getLayout = getLayout;
