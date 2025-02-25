import ProductModal from "components/modal/Product";
import ProductImageModal from "components/modal/ProductImage";
import DeleteProductModal from "components/modal/DeleteProduct";

import UserOrderModal from "components/modal/UserOrder";
import Profile from "components/modal/Profile";
import { useContext, useEffect } from "react";
import { GlobalContext } from "context/global";
import OtletModal from "components/modal/Otlet";
import OtletUpdateModal from "components/modal/OtletUpdate";
import DeleteUserModal from "components/modal/DeleteUser";
import UserModal from "components/modal/User";
import UserUpdateModal from "components/modal/UserUpdate";
import UserDetailModal from "components/modal/UserDetail";
import DeleteCategoryModal from "components/modal/DeleteCategory";
import CategoryModal from "components/modal/Category";
import ContentModal from "components/modal/Content";
import DeleteContentModal from "components/modal/DeleteContent";
import ContentUpdateModal from "components/modal/ContentUpdate";
import ContentDetailModal from "components/modal/ContentDetail";
import DeleteRekomenModal from "components/modal/DeleteRekomen";
import AddedRekomenModal from "components/modal/AddedRekomen";
import DeleteBrandModal from "components/modal/DeleteBrand";
import AddedBrandModal from "components/modal/AddedBrand";
import UserDetailCstModal from "components/modal/UserDetailCst";
import ProductEdit from "components/modal/ProductEdit";
import ProductDetail from "components/modal/ProductDetail";
import SubCategoryUpdate from "components/modal/SubCategoryUpdate";
import Voucher from "components/modal/Voucher";
import DeleteVoucher from "components/modal/DeleteVoucher";
import VoucherUpdate from "components/modal/VoucherUpdate";
import DiscountDetail from "components/modal/DiscountDetail";
import DeleteDiscount from "components/modal/DeleteDiscount";

const Modal = (props) => {
  const { modal } = props.globalCtx;
  const { setModal } = props.globalAct;

  const { globalCtx, globalAct } = useContext(GlobalContext);
  useEffect(() => {
    console.log("fetch data status : ", globalCtx.isFetch);
  }, [globalCtx]);

  return (
    <div className="">
      <div
        onClick={() => setModal("")}
        className={`bg-black/60 fixed w-full h-screen z-10 ${
          modal !== "" ? "" : "hidden"
        }`}
      />
      {/* <div
        className={`${
          modal === "addProduct" ? "translate-x-0" : "-translate-x-full"
        } z-50 fixed duration-700 w-2/4 h-screen p-4`}
      >
        <ProductModal />
      </div> */}
      {/* <div
        className={`${
          modal === "addProduct" ? "translate-x-0" : "translate-x-full"
        } z-50 fixed right-0 duration-700 w-96 h-screen p-4`}
      >
        <ProductImageModal />
      </div> */}
      <div
        className={`${
          modal === "deleteProduct" ? "translate-x-0" : "-translate-x-full"
        } z-50 fixed bottom-0 duration-500 w-full h-auto p-4`}
      >
        <DeleteProductModal />
      </div>
      <div
        className={`${
          modal === "deleteVoucher" ? "translate-x-0" : "-translate-x-full"
        } z-50 fixed bottom-0 duration-500 w-full h-auto p-4`}
      >
        <DeleteVoucher />
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
        } z-50 fixed right-0 duration-500 w-60 h-fit p-4`}
      >
        <Profile />
      </div>
      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "addOtlet"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <OtletModal />
      </div>
      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "addProduct"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <ProductModal />
      </div>
      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "addVoucher"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <Voucher />
      </div>
      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "addUser"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <UserModal />
      </div>
      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "addContent"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <ContentModal />
      </div>
      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "editOtlet"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <OtletUpdateModal />
      </div>
      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "editProduct"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <ProductEdit />
      </div>
      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "detailProduct"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <ProductDetail />
      </div>
      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "editSubCategory"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <SubCategoryUpdate />
      </div>

      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "editUser"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <UserUpdateModal />
      </div>

      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "editVoucher"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <VoucherUpdate />
      </div>

      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "editContent"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <ContentUpdateModal />
      </div>

      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "detailUser"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <UserDetailModal />
      </div>
      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "detailDiscount"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <DiscountDetail />
      </div>

      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "detailUserCst"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <UserDetailCstModal />
      </div>

      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "detailContent"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <ContentDetailModal />
      </div>

      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "editCategory"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <CategoryModal />
      </div>

      <div
        className={`${
          modal === "deleteUser" ? "translate-x-0" : "-translate-x-full"
        } z-50 fixed bottom-0 duration-500 w-full h-auto p-4`}
      >
        <DeleteUserModal />
      </div>
      <div
        className={`${
          modal === "deleteCategory" ? "translate-x-0" : "-translate-x-full"
        } z-50 fixed bottom-0 duration-500 w-full h-auto p-4`}
      >
        <DeleteCategoryModal />
      </div>
      <div
        className={`${
          modal === "deleteContent" ? "translate-x-0" : "-translate-x-full"
        } z-50 fixed bottom-0 duration-500 w-full h-auto p-4`}
      >
        <DeleteContentModal />
      </div>
      <div
        className={`${
          modal === "deleteRekomen" ? "translate-x-0" : "-translate-x-full"
        } z-50 fixed bottom-0 duration-500 w-full h-auto p-4`}
      >
        <DeleteRekomenModal />
      </div>
      <div
        className={`${
          modal === "deleteBrand" ? "translate-x-0" : "-translate-x-full"
        } z-50 fixed bottom-0 duration-500 w-full h-auto p-4`}
      >
        <DeleteBrandModal />
      </div>
      <div
        className={`${
          modal === "deleteDiscount" ? "translate-x-0" : "-translate-x-full"
        } z-50 fixed bottom-0 duration-500 w-full h-auto p-4`}
      >
        <DeleteDiscount />
      </div>
      <div
        className={`${
          modal === "addedRekomen" ? "translate-x-0" : "-translate-x-full"
        } z-50 fixed bottom-0 duration-500 w-full h-auto p-4`}
      >
        <AddedRekomenModal />
      </div>
      <div
        className={`duration-700 p-5 fixed z-50 rounded-xl flex items-center justify-center w-full ${
          modal === "addedbrand"
            ? "-translate-y-1 bottom-0"
            : "translate-y-full overflow-hidden bottom-0"
        }`}
      >
        <AddedBrandModal />
      </div>
    </div>
  );
};

export default Modal;
