const DetailContent = (props) => {
  // const { modal } = props.globalCtx;
  // const { setModal } = props.globalAct;

  return (
    <>
      <div className="w-full flex items-center p-5">
        <div className="w-36 h-full flex-col flex items-center">
          <div className="w-32 h-32 rounded-md bg-slate-400"></div>
          {/* <p>$title</p> */}
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
              {props.globalCtx.selectedData.type}
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

export default DetailContent;
