import formatRupiah from "components/FunctionRupiah";
import { GlobalContext } from "context/global";
import Image from "next/image";
import { useContext, useState, memo } from "react";

const DetailProduct = (props) => {
  // const { globalCtx, globalAct } = useContext(GlobalContext);
  // const router = useRouter();
  // const [selectedData, setSelectedData] = useState(props.users);
  // const { modal } = props.globalCtx;
  // const { setModal } = props.globalAct;
  console.log("detail product", props.globalCtx.selectedData);
  return (
    <>
      <div className="w-full flex items-center p-5 gap-x-4 mx-4">
        <div className="w-40 h-full flex-col flex items-center">
          {props.globalCtx.selectedData?.pict === "" ? (
            <div className="bg-slate-400 mb-2 relative"></div>
          ) : (
            <div className="w-52 h-52 mb-2 relative bg-red-400 rounded-md">
              <Image
                src={
                  props.globalCtx.selectedData?.pict !== ""
                    ? props.globalCtx.selectedData.pict
                    : "/img/content-default.png"
                }
                layout="fill"
                className="rounded-md"
              />
            </div>
          )}
        </div>
        <div className="ml-10">
          <div className="space-y-2">
            <div className="flex">
              <p className="w-44 text-md font-semibold text-red-500">
                Nama Produk
              </p>
              <p className={"w-4"}>:</p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {props.globalCtx.selectedData.name}
              </p>
            </div>
            <div className="flex">
              <p className="w-44 text-md font-semibold text-red-500">
                Sub Kategori
              </p>
              <p className={"w-4"}>:</p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {props.globalCtx.selectedData.main}
              </p>
            </div>
            <div className="flex">
              <p className="w-44 text-md font-semibold text-red-500">Price</p>
              <p className={"w-4"}>:</p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {formatRupiah(
                  props.globalCtx.selectedData?.price !== undefined
                    ? props.globalCtx.selectedData?.price
                    : 0,
                  "Rp"
                )}
              </p>
            </div>
            <div className="flex">
              <p className="w-44 text-md font-semibold text-red-500">Weight</p>
              <p className={"w-4"}>:</p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {props.globalCtx.selectedData.weight} gr
              </p>
            </div>
            <div className="flex">
              <p className="w-44 text-md font-semibold text-red-500">Stock</p>
              <p className={"w-4"}>:</p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {props.globalCtx.selectedData.stock} items
              </p>
            </div>
            <div className="flex">
              <p className="w-44 text-md font-semibold text-red-500">
                Description
              </p>
              <p className={"w-4"}>:</p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {props.globalCtx.selectedData.description}
              </p>
            </div>
            <div className="flex">
              <p className="w-44 text-md font-semibold text-red-500">
                Info lengkap
              </p>
              <p className={"w-4"}>:</p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {props.globalCtx.selectedData?.add_info !== ""
                  ? props.globalCtx.selectedData?.add_info
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(DetailProduct);
