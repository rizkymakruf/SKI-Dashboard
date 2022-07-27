import { useContext, memo } from "react";
import { GlobalContext } from "context/global";
import Link from "next/link";
const UserOrderModal = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);

  return (
    <div className="bg-white w-full h-auto rounded-md shadow-sm shadow-black">
      <div className="bg-red-500 h-12 w-full flex items-center justify-between px-3 rounded-t-md">
        <p className="text-white font-bold text-sm">ORDER INFO</p>
        <button
          onClick={() => globalAct.setModal("")}
          className={
            "bg-white items-center justify-center h-8 w-8 rounded-md shadow-md flex gap-x-2 text-xs text-red-500 hover:w-24 duration-150 hover:after:content-['Back']"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="p-3 w-full flex flex-col gap-y-2">
        <p className="text-gray-700 text-sm font-semibold">Produk</p>
        <div className="border-2 rounded-md p-2">
          <div className="flex text-sm">
            <p className="w-10">Item</p>
            <p className="px-2">:</p>
            <p>Coffee tubruk gajah</p>
          </div>
          <div className="flex text-sm">
            <p className="w-10">Qty</p>
            <p className="px-2">:</p>
            <p>10 items</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm font-semibold">Pembayaran</p>
        <div className="border-2 rounded-md p-2">
          <div className="flex text-sm">
            <p className="w-12">Total</p>
            <p className="px-2">:</p>
            <p>Rp 100.000</p>
          </div>
          <div className="flex text-sm">
            <p className="w-12">Method</p>
            <p className="px-2">:</p>
            <p>Bank Tranfer : BCA</p>
          </div>
          <div className="flex text-sm">
            <p className="w-12">Status</p>
            <p className="px-2">:</p>
            <p>Success</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm font-semibold">Ekspedisi</p>
        <div className="border-2 rounded-md p-2">
          <div className="flex text-sm">
            <p className="w-16">Berat</p>
            <p className="px-2">:</p>
            <p>10 Kg</p>
          </div>
          <div className="flex text-sm">
            <p className="w-16">Ekspedisi</p>
            <p className="px-2">:</p>
            <p>JNT</p>
          </div>
          <div className="flex text-sm">
            <p className="w-16">Ongkir</p>
            <p className="px-2">:</p>
            <p>Rp 25.000</p>
          </div>
          <div className="flex text-sm">
            <p className="w-16">Penerima</p>
            <p className="px-2">:</p>
            <p>Muhammad Fatah</p>
          </div>
          <div className="flex text-sm">
            <p className="w-16">No. HP</p>
            <p className="px-2">:</p>
            <p>089786567677</p>
          </div>
          <div className="flex text-sm">
            <p className="w-16">Alamat</p>
            <p className="px-2">:</p>
          </div>
          <p className="text-sm">
            Jl. Mawar No.12, Buleleng, Singaraja, Bali, Indonesia
          </p>
        </div>
      </div>
      <div className="w-full p-2">
        {/* <Link href={"/dashboard/order/label"}> */}
        {/* <a target="_blank"> */}
        <button
          className={
            "w-full bg-blue-500/30 items-center justify-center py-1 rounded-md hover:bg-blue-500/50 shadow-md flex gap-x-2 text-xs text-blue-500 border border-blue-300"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
              clip-rule="evenodd"
            />
          </svg>
          <p>Cetak Label</p>
        </button>
        {/* </a> */}
        {/* </Link> */}
      </div>
    </div>
  );
};

export default memo(UserOrderModal);
