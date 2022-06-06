import Link from "next/link";

const DashboardCard = (props) => {
  return (
    <div className="duration-500 bg-white border-orange-300 border-2 shadow-md w-full h-44 rounded-md p-4 flex flex-col justify-between hover:shadow-red-500 hover:scale-95">
      <div>
        <p className="text-sm">Currently we have :</p>
        <div className="flex items-center gap-x-2">
          <p className="text-red-500 font-bold underline">900</p>
          <p className="text-gray-600 text-sm font-semibold">{props.content}</p>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <p className="text-sm font-bold">{props.title}</p>
        <Link href={props.routes} passHref>
          <button
            className={
              "bg-orange-500/30 items-center justify-center h-8 w-8 rounded-md hover:bg-red-orange/50 shadow-md flex gap-x-2 text-xs text-orange-500 hover:w-24 duration-150 hover:after:content-['See_all'] "
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-orange-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardCard;
