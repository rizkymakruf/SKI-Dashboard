import { GlobalContext } from "context/global";
import { useRouter } from "next/router";
import { useContext, useState, memo } from "react";
import Image from "next/image";

const DetailUserCst = (props) => {
  return (
    <>
      <div className="w-full flex items-center p-5">
        <div className="w-36 h-full flex-col flex items-center">
          {/* <div className="w-28 h-28 rounded-full bg-slate-400 mb-2"></div> */}
          <div className="w-28 h-28 mb-2 relative">
            <Image
              src={
                props.globalCtx.selectedData?.pict !== ""
                  ? props.globalCtx.selectedData.pict
                  : "/img/user-default.png"
              }
              layout="fill"
              className="rounded-full"
              unoptimized={true}
            />
          </div>
          <p>{props.globalCtx.selectedData.username}</p>
        </div>
        <div className="ml-4">
          <div className="space-y-2">
            <div className="grid grid-cols-2">
              <p className="text-md font-semibold text-red-500">Fullname</p>
              <p className="text-md font-semibold text-gray-500">
                {props.globalCtx.selectedData.fullname}
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-md font-semibold text-red-500">Email</p>
              <p className="text-md font-semibold text-gray-500">
                {props.globalCtx.selectedData.email}
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-md font-semibold text-red-500">Phone</p>
              <p className="text-md font-semibold text-gray-500">
                {props.globalCtx.selectedData.phone}
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-md font-semibold text-red-500">Address</p>
              <p className="text-md font-semibold text-gray-500">
                {props.globalCtx.selectedData.address}
              </p>
            </div>
          </div>

          {/* <label className="switch">
            <input
              type="checkbox"
              // value={moreDay}
              // onClick={() => {
              //   setMoreDay(!moreDay);
              //   setInputValue({ ...inputValue, sampai: "" });
              // }}
              // onChange={(e) => setMoreDay(e.target.checked)}
            />
            <span className="slider round"></span>
          </label> */}
        </div>
      </div>
    </>
  );
};

export default memo(DetailUserCst);
