import { Icon } from "@iconify/react";
import { memo } from "react";

const Loading = (props) => {
  return (
    <div className="w-full flex items-center justify-center p-10">
      <Icon icon="line-md:loading-alt-loop" color="red" className="w-52 h-52" />
    </div>
  );
};

export default memo(Loading);
