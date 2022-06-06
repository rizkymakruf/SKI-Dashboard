import Link from "next/link";
import Image from "next/image";
import fetchJson, { FetchError } from "lib/fetchJson";

import { useRouter } from "next/router";
import { useContext } from "react";

import { GlobalContext } from "context/global";
import Modal from "./Modal";

const ChildMenu = ({ q, a, r }) => (
  <Link href={q}>
    <button
      className={`duration-500 w-full h-10 flex items-center border-b pl-8  text-xs ${
        r === q
          ? "border-red-600 bg-red-500 text-white"
          : "text-gray-700 border-gray-300 bg-white hover:scale-105 hover:bg-red-500 hover:text-white"
      } font-bold`}
    >
      {a}
    </button>
  </Link>
);

const Item = ({ q, a, r }) => (
  <div className='relative overflow-hidden border-b-2 border-white'>
    <input
      defaultChecked
      type='checkbox'
      className='peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer'
    />
    <div className='h-12 w-full pl-5 flex items-center text-red-500 font-semibold'>
      {q}
    </div>
    <div className='absolute top-3 right-3 transition-transform duration-500 rotate-0 peer-checked:-rotate-90'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5 text-blue-500'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M15 19l-7-7 7-7'
        />
      </svg>
    </div>
    <div className='overflow-hidden bg-white transition-all duration-500 max-h-0 peer-checked:max-h-64 '>
      {a.map((item, key) => (
        <ChildMenu q={item.link} a={item.name} r={r} key={key} />
      ))}
    </div>
  </div>
);

const SideNav = ({ children }) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);

  const router = useRouter();
  const { query } = router;
  const faqs = [
    {
      name: "Manage",
      menu: [
        {
          link: "/dashboard",
          name: "Dashboard",
        },
        {
          link: "/dashboard/product",
          name: "Product",
        },
        {
          link: "/dashboard/category",
          name: "Category",
        },
        {
          link: "/dashboard/order",
          name: "Order",
        },
        {
          link: "/dashboard/history",
          name: "History",
        },
        {
          link: "/dashboard/report",
          name: "Report",
        },
      ],
    },
  ];

  const logout = async () => {
    const body = {
      uri: "bo/logout",
    };
    try {
      const lg = await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.push("/");
    } catch (error) {
      if (error instanceof FetchError) {
        globalAct.setErrorMsg(error.data.message);
      } else {
        globalAct.setErrorMsg("An unexpected error happened");
      }
    }
  };

  return (
    <>
      <Modal globalCtx={globalCtx} globalAct={globalAct} />
      <div className='w-full h-full flex flex-row '>
        <div className='w-80 h-screen bg-gray-200 flex flex-col select-none'>
          <div className='w-full h-auto flex justify-center items-center'>
            <div className='w-52 h-52 p-4'>
              <div className='w-full h-full relative rounded-full overflow-hidden'>
                <div className='bg-white w-full h-full'></div>
              </div>
            </div>
          </div>

          <div className='w-full h-full bg-gray-200'>
            {/* overflow-scroll */}
            {faqs.map((item, key) => (
              <Item q={item.name} a={item.menu} key={key} r={router.asPath} />
            ))}
          </div>
        </div>
        <div className='w-full max-h-max relative border-l-2'>
          <div className='w-full h-14 p-6 absolute top-0 bg-gray-100 border-b shadow-sm flex justify-between'>
            <div className='w-full h-auto flex items-center text-sm capitalize'>
              <Link href='/dashboard'>
                <svg
                  className='w-6 h-6 stroke-amber-200 fill-amber-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                  ></path>
                </svg>
              </Link>
              <p className='text-gray-600 font-semibold'>
                &nbsp;• {router.asPath.split("/").at(-2)} •{" "}
                {router.asPath.split("/").at(-1)}
              </p>
            </div>
            <div className='w-full h-full flex items-center justify-end gap-2 text-xs font-semibold'>
              <p className='text-gray-600'>{globalCtx.fullname}</p>
              <div
                onClick={() => globalAct.setModal("userProfile")}
                className='w-6 h-6 rounded-full bg-amber-500  flex justify-center items-center border-2 border-white shadow'
              >
                <svg
                  className='w-4 h-4 stroke-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M13 5l7 7-7 7M5 5l7 7-7 7'
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className='w-full h-full pt-16'>{children}</div>
        </div>
      </div>
    </>
  );
};

export const getLayout = (page) => <SideNav>{page}</SideNav>;

export default SideNav;
