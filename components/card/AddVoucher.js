import { memo } from "react";
const AddVoucher = (props) => {
  const { modal } = props.globalCtx;
  const { setModal } = props.globalAct;
  return (
    <div className="w-full flex items-center justify-between ">
      <p className="text-md font-bold text-red-600 w-full">Tambah Voucher</p>
      <button
        onClick={() => setModal("addVoucher")}
        className={
          "bg-green-500/30 text-md items-center justify-center h-8 w-8 rounded-md hover:bg-green-500/50 shadow-md flex before:gap-x-2 text-xs text-green-500 hover:w-28 duration-150 hover:before:content-['Tambah'] before:font-semibold border border-green-300"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-green"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default memo(AddVoucher);
