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
            <div className="w-32 h-32 rounded-full bg-slate-400 mb-2 relative"></div>
          ) : (
            <div className="w-32 h-32 mb-2 relative">
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
          {/* <p>{props.globalCtx.selectedData.username}</p> */}
          {/* <p>Nama Product</p> */}
        </div>
        <div className="ml-4">
          <div className="space-y-2">
            <div className="flex">
              <p className="w-32 text-md font-semibold text-red-500">
                Nama Produk
              </p>
              <p className={"w-4"}>:</p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {/* {props.globalCtx.selectedData.fullname} */}
                Delonghi Stilosa EC230.BK Coffee Maker Mesin Kopi Espresso EC
                230 B
              </p>
            </div>

            <div className="flex">
              <p className="w-32 text-md font-semibold text-red-500">Outlet</p>
              <p className={"w-4"}>:</p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {/* {props.globalCtx.selectedData.phone} */}
                Seren Coffee
              </p>
            </div>
            <div className="flex">
              <p className="w-32 text-md font-semibold text-red-500">Price</p>
              <p className={"w-4"}>:</p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {/* {props.globalCtx.selectedData.address} */}
                Rp 2.100.800
              </p>
            </div>
            <div className="flex">
              <p className="w-32 text-md font-semibold text-red-500">Weight</p>
              <p className={"w-4"}>:</p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {/* {props.globalCtx.selectedData.outlet?.name} */}
                4300gr
              </p>
            </div>
            <div className="flex">
              <p className="w-32 text-md font-semibold text-red-500">Stock</p>
              <p className={"w-4"}>:</p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {/* {props.globalCtx.selectedData.outlet?.name} */}
                43 items
              </p>
            </div>
            <div className="flex">
              <p className="w-32 text-md font-semibold text-red-500">
                Discount
              </p>
              <p className={"w-4"}>:</p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {/* {props.globalCtx.selectedData.outlet?.name} */}
                True
              </p>
            </div>
            <div className="flex">
              <p className="w-32 text-md font-semibold text-red-500">
                Recommend
              </p>
              <p className={"w-4"}>:</p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {/* {props.globalCtx.selectedData.outlet?.name} */}
                True
              </p>
            </div>
            <div className="flex">
              <p className="w-32 text-md font-semibold text-red-500">
                Description
              </p>
              <p className={"w-4"}>:</p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {/* {props.globalCtx.selectedData.email} */}
                Brew a wide range of milk based beverages thanks to the
                stainless steel milk frother - Extra space for your mug by
                simply removing the drip tray hosting your preferred cup up to
                110 mm
              </p>
            </div>
            <div className="flex">
              <p className="w-32 text-md font-semibold text-red-500">
                Info lengkap
              </p>
              <p className={"w-4"}>:</p>
              <p className="text-md font-semibold text-gray-500 w-5/6">
                {/* {props.globalCtx.selectedData.email} */}-
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(DetailProduct);
