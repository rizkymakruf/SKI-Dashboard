const DetailUser = (props) => {
  // const { modal } = props.globalCtx;
  // const { setModal } = props.globalAct;
  return (
    <>
      <div className="w-full flex items-center p-5">
        <div className="w-36 h-full flex-col flex items-center">
          <div className="w-28 h-28 rounded-full bg-slate-400"></div>
          <p>$username</p>
        </div>
        <div className="w-28 space-y-2 ml-4">
          {/* <p className="text-md font-semibold text-red-500">Username</p> */}
          <p className="text-md font-semibold text-red-500">Fullname</p>
          <p className="text-md font-semibold text-red-500">Email</p>
          <p className="text-md font-semibold text-red-500">Phone</p>
          <p className="text-md font-semibold text-red-500">Address</p>
          <p className="text-md font-semibold text-red-500">Outlet</p>
          <p className="text-md font-semibold text-red-500">Active</p>
        </div>
        <div className="space-y-2">
          {/* <p className="text-md font-semibold text-gray-500">$username</p> */}
          <p className="text-md font-semibold text-gray-500">$fullname</p>
          <p className="text-md font-semibold text-gray-500">$email</p>
          <p className="text-md font-semibold text-gray-500">$phone</p>
          <p className="text-md font-semibold text-gray-500">$address</p>
          <p className="text-md font-semibold text-gray-500">$outlet</p>
          <label className="switch">
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
          </label>
        </div>
      </div>
    </>
  );
};

export default DetailUser;
