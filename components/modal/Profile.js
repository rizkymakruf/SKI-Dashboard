import FormProduct from "components/form/FormProduct";
import { useContext } from "react";
import { GlobalContext } from "context/global";
import Link from "next/link";
const Profile = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);

  return (
    <div
      className='bg-white w-full h-auto rounded-md shadow-sm shadow-black'
      onMouseOver={() => globalAct.setModal("userProfile")}
    >
      <div className='bg-red-500 h-12 w-full flex items-center justify-between px-3'>
        <p className='text-white font-bold'>User Profile</p>
        <button
          onClick={() => globalAct.setModal("")}
          className={
            "bg-white items-center justify-center h-8 w-8 rounded-md shadow-md flex gap-x-2 text-xs text-red-500 hover:w-24 duration-150 hover:after:content-['Back']"
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 text-red-500'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
      <div className='p-3 w-full flex flex-col gap-y-2'>
        <div className='flex items-center flex-col gap-y-2'>
          <div className='bg-black w-20 h-20 rounded-full' />
          <div>
            <p className='text-md font-semibold'>Karina Salim</p>
          </div>
        </div>
        <div className='flex flex-col gap-y-2 '>
          <Link href={"/dashboard/profile"} passHref>
            <button className='p-2 text-left bg-blue-500/30 rounded-md text-blue-500 hover:bg-blue-500/50 flex flex-row items-center justify-between'>
              <p>Profile</p>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </Link>
          <button className='p-2 text-left bg-red-500/30 rounded-md text-red-500 hover:bg-red-500/50 flex flex-row items-center justify-between'>
            <p>Logged out</p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
