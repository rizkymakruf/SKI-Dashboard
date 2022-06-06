import { useState, useEffect, useRef } from "react";
import Image from "next/image";
export default function FormImage({
  myRef,
  globalCtx,
  globalAct,
  onSubmit,
  update,
  setUpdate,
  slide,
  setSlide,
  isFetch,
  errorMessage,
  cancelRemove,
  handleImage,
  removeMe,
}) {
  const [imageFile, setImageFile] = useState([]);
  const inputFileImage = useRef(null);

  const upLoad = (props, ref) => {
    inputFileImage.current.click();
  };

  const resetForm = (e) => {
    e.preventDefault();
    document.querySelector("form").reset();
    setSlide([]);
    setUpdate([]);
  };

  useEffect(() => {
    if (update.length > 0) {
      setSlide([]);
      document.querySelector("input[name=kex]").value = update[0]._key;
      document.querySelector("input[name=name]").value = update[0].name;
      document.querySelector("textarea").value = update[0].wording;
      if (update[0].images.length > 0) {
        setSlide(update[0].images);
      }
    }
  }, [update]);

  return (
    <div className='w-full h-auto bg-white'>
      <div className='w-full h-auto relative pt-2'>
        <input
          accept='image/png, image/gif, image/jpeg'
          type='file'
          id='fileContract'
          ref={inputFileImage}
          style={{ display: "none" }}
          onChange={(e) => handleImage(e)}
          disabled={isFetch ? "disabled" : ""}
        />

        <form onSubmit={onSubmit}>
          <div className='w-full h-auto relative flex-row gap-2 flex items-center px-4 pt-2'>
            <div
              onClick={upLoad}
              className='w-full h-32 relative z-0 flex text-gray-700 flex-col justify-center items-center rounded h-passport border-2 border-dashed bg-white backdrop-filter bg-opacity-20 backdrop-blur-lg'
            >
              {isFetch ? (
                <svg
                  className='animate-spin h-5 w-5 text-blue-300'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              ) : (
                <>
                  <h3 className='text-gray-700'>
                    <i className='fas fa-cloud-download-alt'></i>
                  </h3>

                  <p className='font-light text-xs text-black text-center px-3'>
                    Drop here or click here
                  </p>
                </>
              )}
            </div>

            <div className='w-full h-32 relative overflow-hidden'>
              <div className='relative w-full flex gap-2 snap-x snap-mandatory overflow-x-auto'>
                {slide.length > 0 &&
                  slide.map(function (content, index) {
                    return (
                      <div
                        key={index}
                        className='snap-end scroll-mx-2 shrink-0 relative'
                      >
                        <div className='shrink-0 w-80 h-32 rounded relative border overflow-hidden'>
                          <Image
                            src={content.secure_url}
                            blurDataURL='data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
                            alt='Picture of the author'
                            layout='fill'
                            objectFit='cover'
                            placeholder='blur'
                          />
                          <div
                            onClick={() => removeMe(index)}
                            className='w-5 h-5 p-1 overflow-hidden right-0 m-1 border-2 border-gray-200 absolute z-0 bg-white rounded-full flex justify-center items-center text-xs font-bold'
                          >
                            <div className='bg-red-500 w-2 h-2' />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {errorMessage && <p className='px-4 text-red-600'>{errorMessage}</p>}

          <div className='w-full h-auto relative px-4 py-3 flex justify-end gap-1'>
            <div className='w-full h-auto flex justify-end gap-2'>
              <button
                onClick={(e) => resetForm(e)}
                // disabled={globalCtx.isFetch ? "disabled" : ""}
                className='px-6 h-8 bg-yellow-500/30 text-yellow-500 border-2 shadow-md hover:bg-yellow-500/50 border-yellow-300 font-semibold rounded overflow-hidden'
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                // disabled={globalCtx.isFetch ? "disabled" : ""}
                className='px-6 h-8 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden'
              >
                Save
              </button>
              <span
                className={`${
                  !isFetch && "invisible"
                } flex absolute h-4 w-4 top-3 right-4 -mt-1 -mr-1`}
              >
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-50 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-4 w-4 bg-red-300'></span>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
