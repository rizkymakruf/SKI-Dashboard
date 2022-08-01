import { Icon } from "@iconify/react";
import { memo } from "react";
import Image from "next/image";
import Load from "../../public/img/loading2.gif";

const Loading = (props) => {
  return (
    <div className="w-full flex items-center justify-center p-10">
      <Image src={Load} width={300} height={300} />
    </div>
  );
};

export default memo(Loading);
