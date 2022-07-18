import FormReportOutlet from "components/form/FormReportOutlet";
import { getLayout } from "components/layout/Navbar";

const Report = () => {
  return (
    <div className="w-full p-4">
      <div className="p-3 border border-gray-300 rounded-md hover:shadow-md">
        <FormReportOutlet />
      </div>
    </div>
  );
};

export default Report;
Report.getLayout = getLayout;
