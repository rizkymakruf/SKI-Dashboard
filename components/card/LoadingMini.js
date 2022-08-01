import { Icon } from "@iconify/react";
import { memo } from "react";
import Image from "next/image";
import Load from "../../public/img/loading2.gif";

const LoadingMini = (props) => {
  return (
    <div className="w-full flex items-center justify-center p-10">
      <Image src={Load} width={100} height={100} />
    </div>
  );
};

export default memo(LoadingMini);
