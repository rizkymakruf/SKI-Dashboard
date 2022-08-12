import formatRupiah from "components/FunctionRupiah";
import { GlobalContext } from "context/global";
import Image from "next/image";
import { useContext, useState, memo } from "react";

const DetailDiscount = (props) => {
  // const { globalCtx, globalAct } = useContext(GlobalContext);
  // const router = useRouter();
  // const [selectedData, setSelectedData] = useState(props.users);
  // const { modal } = props.globalCtx;
  // const { setModal } = props.globalAct;
  // console.log("detail product", props.globalCtx.selectedData);
  return (
    <>
      <div className="w-full flex items-center p-5 gap-x-4 mx-4">
        <div className="w-64 h-full flex-col flex items-center">
          <div className="w-full h-32 bg-red-500 rounded-sm relative flex justify-center">
            <div className="absolute w-20 h-20 bg-yellow-400 -right-6 -top-6 rounded-full justify-center items-center flex text-white font-bold text-3xl rotate-12">
              70%
            </div>
            <p className="text-5xl font-bold text-white absolute bottom-3">
              DISCOUNT
            </p>
          </div>
        </div>
        <div className="ml-10">
          <div className="space-y-2">
            <div className="flex">
              <p className="w-44 text-md font-semibold text-red-500">
                List Produk
              </p>
            </div>
            <div className="">
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {/* {props.globalCtx.selectedData.name} */}- kopi 1
              </p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {/* {props.globalCtx.selectedData.name} */}- kopi 1
              </p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {/* {props.globalCtx.selectedData.name} */}- kopi 1
              </p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {/* {props.globalCtx.selectedData.name} */}- kopi 1
              </p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {/* {props.globalCtx.selectedData.name} */}- kopi 1
              </p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {/* {props.globalCtx.selectedData.name} */}- kopi 1
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(DetailDiscount);
