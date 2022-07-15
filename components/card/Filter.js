import { memo } from "react";

const Filter = (props) => {
  return (
    <>
      <div className="w-full flex justify-end items-center gap-x-3">
        <div className="flex items-center py-1 px-2 bg-green-500/50 rounded-md border border-green-500 text-sm text-green-700 hover:bg-green-500 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clip-rule="evenodd"
            />
          </svg>
          <p>Belum Dikemas</p>
        </div>
        <div className="flex items-center py-1 px-2 bg-orange-500/50 rounded-md border border-orange-500 text-sm text-orange-600 hover:bg-orange-500 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clip-rule="evenodd"
            />
          </svg>
          <p>Belum Dikirim</p>
        </div>
      </div>
    </>
  );
};

export default memo(Filter);
