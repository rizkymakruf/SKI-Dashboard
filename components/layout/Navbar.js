import Link from "next/link";
import Image from "next/image";
import fetchJson, { FetchError } from "lib/fetchJson";

import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import { GlobalContext } from "context/global";
import Modal from "./Modal";

const ChildMenu = ({ q, i, a, r }) => (
  <Link href={q}>
    <button
      className={`duration-300 w-full h-10 flex items-center border-b pl-8  text-xs ${
        r === q
          ? "border-red-600 bg-red-500 text-white"
          : "text-gray-700 border-gray-300 bg-white hover:scale-105 hover:bg-red-500 hover:text-white"
      } font-bold`}
    >
      {i}
      {a}
    </button>
  </Link>
);

const Item = ({ q, i, a, r }) => (
  <div className="relative overflow-hidden border-b-2 border-white">
    <input
      defaultChecked
      type="checkbox"
      className="peer absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
    />
    <div className="h-12 w-full pl-5 flex items-center text-red-500 font-semibold">
      {q}
    </div>
    <div className="absolute top-3 right-3 transition-transform duration-300 rotate-0 peer-checked:-rotate-90">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
    <div className="overflow-hidden bg-white transition-all duration-300 max-h-0 peer-checked:max-h-full ">
      {a.map((item, key) => (
        <ChildMenu q={item.link} i={item.ic} a={item.name} r={r} key={key} />
      ))}
    </div>
  </div>
);

const SideNav = ({ children, props }) => {
  const { globalCtx, globalAct } = useContext(GlobalContext);

  useEffect(() => {
    console.log("fetch data status : ", globalCtx.isFetch);
  }, [globalCtx]);

  const router = useRouter();
  const { query } = router;
  const faqs = [
    {
      name: "Manage SKI",
      menu: [
        {
          link: "/dashboardSKI",
          name: "Dashboard",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
            </svg>
          ),
        },
        {
          link: "/dashboardSKI/outlet",
          name: "Outlets",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                clip-rule="evenodd"
              />
            </svg>
          ),
        },
        {
          link: "/dashboardSKI/admins",
          name: "Admins",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          ),
        },
        {
          link: "/dashboardSKI/customers",
          name: "Costumers",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          ),
        },
        {
          link: "/dashboardSKI/category",
          name: "Categorys",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
          ),
        },
        {
          link: "/dashboardSKI/content",
          name: "Content",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                clip-rule="evenodd"
              />
            </svg>
          ),
        },
        {
          link: "/dashboardSKI/produkRekomen",
          name: "Product Recomendation",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ),
        },
        {
          link: "/dashboardSKI/topBrand",
          name: "Top Brand",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clip-rule="evenodd"
              />
            </svg>
          ),
        },
        {
          link: "/dashboardSKI/vouchers",
          name: "Vouchers",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                clip-rule="evenodd"
              />
            </svg>
          ),
        },
        {
          link: "/dashboardSKI/report",
          name: "Report",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                clip-rule="evenodd"
              />
            </svg>
          ),
        },
      ],
    },
    {
      name: "Manage Outlet",
      menu: [
        {
          link: `/dashboard/outlet/${globalCtx.currentBrand}`,
          name: "Dashboard",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
            </svg>
          ),
        },
        {
          link: "/dashboard/product",
          name: "Product",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          ),
        },
        {
          link: "/dashboard/category",
          name: "Category",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
          ),
        },
        {
          link: "/dashboard/order",
          name: "Order",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          ),
        },
        {
          link: "/dashboard/voucher",
          name: "Voucher",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                clip-rule="evenodd"
              />
            </svg>
          ),
        },
        {
          link: "/dashboard/history",
          name: "History",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
            </svg>
          ),
        },
        {
          link: "/dashboard/report",
          name: "Report",
          ic: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                clip-rule="evenodd"
              />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <Modal globalCtx={globalCtx} globalAct={globalAct} />
      <div className="w-full h-full flex flex-row fixed">
        <div className="w-80 h-screen bg-white flex flex-col select-none">
          <div className="w-full h-auto flex justify-center items-center">
            <div className="w-52 h-52 p-4">
              <div className="w-full h-full relative rounded-full overflow-hidden">
                <div className="bg-gray-300 w-full h-full"></div>
              </div>
            </div>
          </div>

          <div className="w-full h-full overflow-y-auto">
            {/* overflow-scroll */}
            {globalCtx.adminMode === "ski" ? (
              <Item
                q={faqs[0].name}
                i={faqs[0].ic}
                a={faqs[0].menu}
                r={router.asPath}
              />
            ) : (
              globalCtx.adminMode === "outlet" && (
                <Item
                  q={faqs[1].name}
                  i={faqs[1].ic}
                  a={faqs[1].menu}
                  r={router.asPath}
                />
              )
            )}
          </div>
        </div>
        <div className="w-full h-full relative border-l ">
          <div className="w-full h-14 p-6 z-50 top-0 bg-red-600 shadow-sm flex justify-between">
            <div className="w-full h-full flex items-center text-sm capitalize">
              <Link href="/dashboard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 fill-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </Link>
              <p className="text-white font-semibold">
                &nbsp;• {router.asPath.split("/")[1]} •{" "}
                {router.pathname.split("/")[2]}
                {/* {console.log("route", router.asPath.split("/"))} log jangan disini */}
              </p>
            </div>
            <div className="w-full h-full flex items-center justify-end gap-2 text-xs font-semibold">
              <p className="text-white">{globalCtx.fullname}</p>
              <div
                onClick={() => globalAct.setModal("userProfile")}
                disabled={globalCtx.isFetch ? "disabled" : ""}
                className="w-6 h-6 rounded-full bg-amber-500  flex justify-center items-center border-2 border-white shadow"
              >
                <svg
                  className="w-4 h-4 stroke-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full h-full overflow-y-auto pb-[60px]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export const getLayout = (page) => <SideNav>{page}</SideNav>;

export default SideNav;
