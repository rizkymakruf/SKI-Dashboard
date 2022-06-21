import { useContext } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import AddUser from "components/card/AddUser";
import UsersTable from "components/table/Users";
import SearchUser from "components/search/User";

const ManageUsers = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  return (
    <div className="w-full p-3 flex flex-col gap-y-3">
      <div>
        <AddUser globalAct={globalAct} globalCtx={globalCtx} />
      </div>
      <div>
        <SearchUser globalAct={globalAct} globalCtx={globalCtx} />
      </div>
      <div>
        <UsersTable globalAct={globalAct} globalCtx={globalCtx} />
      </div>
    </div>
  );
};

export default ManageUsers;
ManageUsers.getLayout = getLayout;
