import { useContext, memo, useMemo } from "react";
import { GlobalContext } from "context/global";
import TopBrand from "components/form/TopBrand";
import fetchJson, { FetchError } from "lib/fetchJson";
import { useRouter } from "next/router";

const AddedBrandModal = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const router = useRouter();

  return (
    <div className="w-full h-auto space-y-4">
      {useMemo(() => {
        return <TopBrand />;
      }, [])}
    </div>
  );
};

export default memo(AddedBrandModal);
