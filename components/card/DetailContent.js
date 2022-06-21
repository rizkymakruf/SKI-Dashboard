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
        <div className="w-48 space-y-2 ml-4">
          <p className="text-md font-semibold text-red-500">Title</p>
          <p className="text-md font-semibold text-red-500">Button Content</p>
          <p className="text-md font-semibold text-red-500">
            Route Button Content
          </p>
          <p className="text-md font-semibold text-red-500">
            Description Content
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-md font-semibold text-gray-500">$title</p>
          <p className="text-md font-semibold text-gray-500">$button</p>
          <p className="text-md font-semibold text-gray-500">$routeButton</p>
          <p className="text-md font-semibold text-gray-500">$description</p>
        </div>
      </div>
    </>
  );
};

export default DetailContent;
