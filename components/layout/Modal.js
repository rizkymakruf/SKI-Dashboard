import ProductModal from "components/modal/Product";
import ProductImageModal from "components/modal/ProductImage";
import DeleteProductModal from "components/modal/DeleteProduct";

import UserOrderModal from "components/modal/UserOrder";
import Profile from "components/modal/Profile";

const Modal = (props) => {
  const { modal } = props.globalCtx;
  const { setModal } = props.globalAct;

  return (
    <div className=''>
      <div
        onClick={() => setModal("")}
        className={`bg-black/60 fixed w-full h-screen z-40 ${
          modal !== "" ? "" : "hidden"
        }`}
      />
      <div
        className={`${
          modal === "addProduct" ? "translate-x-0" : "-translate-x-full"
        } z-50 fixed duration-700 w-2/4 h-screen p-4`}
      >
        <ProductModal />
      </div>
      <div
        className={`${
          modal === "addProduct" ? "translate-x-0" : "translate-x-full"
        } z-50 fixed right-0 duration-700 w-96 h-screen p-4`}
      >
        <ProductImageModal />
      </div>
      <div
        className={`${
          modal === "deleteProduct" ? "translate-x-0" : "-translate-x-full"
        } z-50 fixed bottom-0 duration-500 w-full h-auto p-4`}
      >
        <DeleteProductModal />
      </div>
      <div
        className={`${
          modal === "userOrder" ? "translate-x-0" : "translate-x-full"
        } z-50 fixed right-0 duration-500 w-96 h-auto p-4`}
      >
        <UserOrderModal />
      </div>
      <div
        className={`${
          modal === "userProfile" ? "translate-x-0" : "translate-x-full"
        } z-50 fixed right-0 duration-500 w-96 h-fit p-4`}
      >
        <Profile />
      </div>
    </div>
  );
};

export default Modal;
