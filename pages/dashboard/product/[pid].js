import { useContext } from "react";
import { getLayout } from "components/layout/Navbar";
import { GlobalContext } from "context/global";

import FormProduct from "components/form/FormProduct";
import ProductTable from "components/table/Product";

import AddCard from "components/card/AddProduct";

const ManageProduct = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  return (
    <div className="w-full p-2 flex flex-col gap-y-2">
      <div>
        <AddCard globalAct={globalAct} globalCtx={globalCtx} />
      </div>
      <div>
        <ProductTable globalAct={globalAct} globalCtx={globalCtx} />
      </div>
    </div>
  );
};

export default ManageProduct;
ManageProduct.getLayout = getLayout;
