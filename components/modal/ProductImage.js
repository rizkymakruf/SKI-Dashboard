import FormImage from "components/form/FormImage";
import { useContext, useState } from "react";
import { GlobalContext } from "context/global";
import { FetchError } from "lib/listFunct";
import Resizer from "react-image-file-resizer";
const ProductImageModal = () => {
  const { globalAct, globalCtx } = useContext(GlobalContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [isFetch, setIsFetch] = useState(false);
  const [gallery, setGallery] = useState([]);

  const [slide, setSlide] = useState([]);
  const [update, setUpdate] = useState([]);
  return (
    <div className="bg-white w-full h-full rounded-md shadow-sm shadow-black">
      <div className="bg-red-500 h-12 w-full rounded-md flex items-center justify-center">
        <p className="text-white font-bold">Provide Item Image</p>
      </div>
      <FormImage
        // globalCtx={globalCtx}
        // globalAct={globalAct}
        // onSubmit={async function handleSubmit(e) {
        //   e.preventDefault();
        //   globalAct.setIsFetch(true);

        //   const body = {
        //     username: e.currentTarget.username.value,
        //     password: e.currentTarget.password.value,
        //     uri: "login_office",
        //   };

        //   try {
        //     await fetchJson("/api/post", {
        //       method: "POST",
        //       headers: { "Content-Type": "application/json" },
        //       body: JSON.stringify(body),
        //     });
        //     router.replace("/config/dashboard");
        //   } catch (error) {
        //     if (error instanceof FetchError) {
        //       globalAct.setErrorMsg(error.data.message);
        //     } else {
        //       globalAct.setErrorMsg("An unexpected error happened");
        //     }
        //   }

        //   globalAct.setIsFetch(false);
        update={update}
        setUpdate={setUpdate}
        slide={slide}
        setSlide={setSlide}
        errorMessage={errorMsg}
        isFetch={isFetch}
        onSubmit={async function handleSubmit(e) {
          e.preventDefault();
          setIsFetch(true);

          //   const body = {
          //     kex: e.currentTarget.kex.value,
          //     name: e.currentTarget.name.value,
          //     wording: e.currentTarget.wording.value,
          //     slide: slide,
          //     uri: "gallery/",
          //   };

          //   try {
          //     let uri = "/api/prot/" + (update.length > 0 ? "put" : "post");
          //     let meth = update.length > 0 ? "PUT" : "POST";

          //     const resx = await fetchJson(`${uri}`, {
          //       method: `${meth}`,
          //       headers: { "Content-Type": "application/json" },
          //       body: JSON.stringify(body),
          //     });
          //     await setGallery(resx.data);
          //     setErrorMsg("");
          //     setSlide([]);
          //     e.target.reset();
          //   } catch (error) {
          //     if (error instanceof FetchError) {
          //       setErrorMsg(error.data.message);
          //     } else {
          //       setErrorMsg("An unexpected error happened");
          //     }
          //   }

          setIsFetch(false);
        }}
        cancelRemove={async () => {
          await setSlide(props.slide[0].val);
        }}
        handleImage={(e) => {
          e.preventDefault();
          if (slide.length > 6) {
            e.target.value = "";
            alert(
              "error, you can only added 6 image. please remove one of list image below..."
            );
            return;
          }
          Resizer.imageFileResizer(
            event.target.files[0],
            480,
            720,
            "WEBP",
            70,
            0,
            async (uri) => {
              const body = {
                image: uri,
              };

              //   try {
              //     const upload = await fetchJson("/api/prot/upload", {
              //       method: "POST",
              //       headers: { "Content-Type": "application/json" },
              //       body: JSON.stringify(body),
              //     });
              //     await setSlide([upload, ...slide]);
              //   } catch (error) {
              //     if (error instanceof FetchError) {
              //       alert(error.data.message);
              //     } else {
              //       alert("An unexpected error happened");
              //     }
              //   }
            }
          );
          e.target.value = "";
        }}
        removeMe={async (ind) => {
          await setSlide([
            ...slide.slice(0, ind),
            ...slide.slice(ind + 1, slide.length),
          ]);
        }}
      />
    </div>
  );
};

export default ProductImageModal;
