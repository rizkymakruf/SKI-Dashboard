import { memo, useContext } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "context/global";

const Filter = (props) => {
  const router = useRouter();
  const { globalCtx, globalAct } = useContext(GlobalContext);
  return (
    <>
      <div className="w-full flex justify-end items-center gap-x-3">
        <button className="flex items-center py-1.5 px-2 gap-2  rounded-md border text-white bg-blue-500 text-sm hover:bg-blue-500/50 hover:text-blue-700 border-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
          <p
            className=""
            onClick={() =>
              router.replace(
                `/dashboard/order/${globalCtx.currentBrand}?type=all&start=0&length=10`
              )
            }
          >
            Semua Order
          </p>
        </button>
        <button className="flex items-center py-1.5 px-2 gap-2  rounded-md border text-white bg-green-500 text-sm hover:bg-green-500/50 hover:text-green-700 border-green-500">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.3335 5.83333C3.3335 5.61232 3.42129 5.40036 3.57757 5.24408C3.73385 5.0878 3.94582 5 4.16683 5H15.8335C16.0545 5 16.2665 5.0878 16.4228 5.24408C16.579 5.40036 16.6668 5.61232 16.6668 5.83333C16.6668 6.05435 16.579 6.26631 16.4228 6.42259C16.2665 6.57887 16.0545 6.66667 15.8335 6.66667H4.16683C3.94582 6.66667 3.73385 6.57887 3.57757 6.42259C3.42129 6.26631 3.3335 6.05435 3.3335 5.83333ZM5.00016 10C5.00016 9.77899 5.08796 9.56702 5.24424 9.41074C5.40052 9.25446 5.61248 9.16667 5.8335 9.16667H14.1668C14.3878 9.16667 14.5998 9.25446 14.7561 9.41074C14.9124 9.56702 15.0002 9.77899 15.0002 10C15.0002 10.221 14.9124 10.433 14.7561 10.5893C14.5998 10.7455 14.3878 10.8333 14.1668 10.8333H5.8335C5.61248 10.8333 5.40052 10.7455 5.24424 10.5893C5.08796 10.433 5.00016 10.221 5.00016 10ZM6.66683 14.1667C6.66683 13.9457 6.75463 13.7337 6.91091 13.5774C7.06719 13.4211 7.27915 13.3333 7.50016 13.3333H12.5002C12.7212 13.3333 12.9331 13.4211 13.0894 13.5774C13.2457 13.7337 13.3335 13.9457 13.3335 14.1667C13.3335 14.3877 13.2457 14.5996 13.0894 14.7559C12.9331 14.9122 12.7212 15 12.5002 15H7.50016C7.27915 15 7.06719 14.9122 6.91091 14.7559C6.75463 14.5996 6.66683 14.3877 6.66683 14.1667Z"
              fill="white"
            />
          </svg>
          <p
            className=""
            onClick={() =>
              router.replace(
                `/dashboard/order/${globalCtx.currentBrand}?type=confirmed&start=0&length=10`
              )
            }
          >
            Belum Dikemas
          </p>
        </button>
        <button className="flex items-center py-1.5 px-2 gap-2 rounded-md border border-orange-500 text-sm text-white bg-orange-500 hover:bg-orange-500/50 hover:text-orange-600">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.3335 5.83333C3.3335 5.61232 3.42129 5.40036 3.57757 5.24408C3.73385 5.0878 3.94582 5 4.16683 5H15.8335C16.0545 5 16.2665 5.0878 16.4228 5.24408C16.579 5.40036 16.6668 5.61232 16.6668 5.83333C16.6668 6.05435 16.579 6.26631 16.4228 6.42259C16.2665 6.57887 16.0545 6.66667 15.8335 6.66667H4.16683C3.94582 6.66667 3.73385 6.57887 3.57757 6.42259C3.42129 6.26631 3.3335 6.05435 3.3335 5.83333ZM5.00016 10C5.00016 9.77899 5.08796 9.56702 5.24424 9.41074C5.40052 9.25446 5.61248 9.16667 5.8335 9.16667H14.1668C14.3878 9.16667 14.5998 9.25446 14.7561 9.41074C14.9124 9.56702 15.0002 9.77899 15.0002 10C15.0002 10.221 14.9124 10.433 14.7561 10.5893C14.5998 10.7455 14.3878 10.8333 14.1668 10.8333H5.8335C5.61248 10.8333 5.40052 10.7455 5.24424 10.5893C5.08796 10.433 5.00016 10.221 5.00016 10ZM6.66683 14.1667C6.66683 13.9457 6.75463 13.7337 6.91091 13.5774C7.06719 13.4211 7.27915 13.3333 7.50016 13.3333H12.5002C12.7212 13.3333 12.9331 13.4211 13.0894 13.5774C13.2457 13.7337 13.3335 13.9457 13.3335 14.1667C13.3335 14.3877 13.2457 14.5996 13.0894 14.7559C12.9331 14.9122 12.7212 15 12.5002 15H7.50016C7.27915 15 7.06719 14.9122 6.91091 14.7559C6.75463 14.5996 6.66683 14.3877 6.66683 14.1667Z"
              fill="white"
            />
          </svg>
          <p
            onClick={() =>
              router.replace(
                `/dashboard/order/${globalCtx.currentBrand}?type=packed&start=0&length=10`
              )
            }
          >
            Belum Dikirim
          </p>
        </button>
      </div>
    </>
  );
};

export default memo(Filter);
