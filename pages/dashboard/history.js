import { useContext } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import HistoryTable from "components/table/History";
import FormHistory from "components/form/FormHistory";

const History = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  return (
    <div className='w-full p-2 flex flex-col gap-y-2'>
      <div>
        <HistoryTable />
      </div>
      <div>
        <FormHistory globalAct={globalAct} globalCtx={globalCtx} />
      </div>
    </div>
  );
};

export default History;
History.getLayout = getLayout;
