import { useContext } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import AddUser from "components/card/AddUser";
import UsersTable from "components/table/Users";

const ManageUsers = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  return (
    <div className="w-full p-2 flex flex-col gap-y-2">
      <div>
        <AddUser globalAct={globalAct} globalCtx={globalCtx} />
      </div>
      <div>
        <UsersTable globalAct={globalAct} globalCtx={globalCtx} />
      </div>
    </div>
  );
};

export default ManageUsers;
ManageUsers.getLayout = getLayout;
