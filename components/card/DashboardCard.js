import Link from "next/link";
import { memo } from "react";
const DashboardCard = (props) => {
  return (
    <div className="duration-300 bg-white border-orange-300 border shadow-md w-full h-44 rounded-md p-4 flex flex-col justify-between hover:shadow-red-500 hover:scale-95">
      <div>
        <p className="text-sm">Saat ini outlet memiliki :</p>
        <div className="flex items-center gap-x-2">
          <p className="text-red-500 font-bold underline">{props.jml}</p>
          <p className="text-gray-600 text-sm font-semibold">{props.content}</p>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <p className="text-sm font-bold">{props.title}</p>
        <Link href={props.routes} passHref>
          <button
            className={
              "bg-orange-500/30 items-center justify-center h-8 w-8 rounded-md hover:bg-red-orange/50 shadow-md flex gap-x-2 text-xs text-orange-500 hover:w-24 duration-150 hover:after:content-['Manage'] "
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-orange-5000"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default memo(DashboardCard);
