import { memo } from "react";
import Image from "next/image";

const DetailContent = (props) => {
  // const { modal } = props.globalCtx;
  // const { setModal } = props.globalAct;

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
                    : "/img/user-default.png"
                }
                layout="fill"
                className="rounded-full"
              />
            </div>
          )}
        </div>
        <div className="space-y-2 ml-4">
          <div className="flex">
            <p className="w-48 text-md font-semibold text-red-500">Title</p>
            <p className="text-md font-semibold text-gray-500">
              {props.globalCtx.selectedData.title}
            </p>
          </div>
          <div className="flex">
            <p className="w-48 text-md font-semibold text-red-500">
              Button Content
            </p>
            <p className="text-md font-semibold text-gray-500">
              {props.globalCtx.selectedData.label}
            </p>
          </div>
          <div className="flex">
            <p className="w-48 text-md font-semibold text-red-500">
              Slider Position
            </p>
            <p className="text-md font-semibold text-gray-500">
              {props.globalCtx.selectedData.type === 1
                ? "Position Top"
                : "Position Bottom"}
            </p>
          </div>
          <div className="flex">
            <p className="w-48 text-md font-semibold text-red-500">
              Description Content
            </p>
            <p className="text-md font-semibold text-gray-500">
              {props.globalCtx.selectedData.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(DetailContent);
