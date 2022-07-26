import { GlobalContext } from "context/global";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState, memo } from "react";
import { fill } from "tailwindcss/defaulttheme";

const DetailProduct = (props) => {
  // const { globalCtx, globalAct } = useContext(GlobalContext);
  // const router = useRouter();
  // const [selectedData, setSelectedData] = useState(props.users);
  // const { modal } = props.globalCtx;
  // const { setModal } = props.globalAct;
  // console.log("helll", props.globalCtx.selectedData);
  return (
    <>
      <div className="w-full flex items-center p-5">
        <div className="w-36 h-full flex-col flex items-center">
          {props.globalCtx.selectedData?.pict === "" ? (
            <div className="w-28 h-28 rounded-full bg-slate-400 mb-2 relative"></div>
          ) : (
            <div className="w-28 h-28 mb-2 relative">
              <Image
                src={
                  props.globalCtx.selectedData?.pict !== ""
                    ? props.globalCtx.selectedData.pict
                    : "/img/content-default.png"
                }
                layout="fill"
                className="rounded-full"
              />
            </div>
          )}
          {/* <p>{props.globalCtx.selectedData.username}</p> */}
          <p>Nama Product</p>
        </div>
        <div className="ml-4">
          <div className="space-y-2">
            <div className="flex">
              <p className="w-32 text-md font-semibold text-red-500">
                Fullname
              </p>
              <p className="text-md font-semibold text-gray-500">
                {/* {props.globalCtx.selectedData.fullname} */}
                nama lengkap
              </p>
            </div>
            <div className="flex">
              <p className="w-32 text-md font-semibold text-red-500">Email</p>
              <p className="text-md font-semibold text-gray-500">
                {/* {props.globalCtx.selectedData.email} */}
                ini email
              </p>
            </div>
            <div className="flex">
              <p className="w-32 text-md font-semibold text-red-500">Phone</p>
              <p className="text-md font-semibold text-gray-500">
                {/* {props.globalCtx.selectedData.phone} */}
                098765434356744
              </p>
            </div>
            <div className="flex">
              <p className="w-32 text-md font-semibold text-red-500">Address</p>
              <p className="text-md font-semibold text-gray-500">
                {/* {props.globalCtx.selectedData.address} */}
                alamat niii
              </p>
            </div>
            <div className="flex">
              <p className="w-32 text-md font-semibold text-red-500">Outlet</p>
              <p className="text-md font-semibold text-gray-500">
                {/* {props.globalCtx.selectedData.outlet?.name} */}
                nama outlet nii
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(DetailProduct);