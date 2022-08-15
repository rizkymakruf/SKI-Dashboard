import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import fetchJson, { FetchError } from "lib/fetchJson";

import { GlobalContext } from "context/global";

import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";

import { checkUid, findOutlet } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";

import FormLogin from "components/form/FormLogin";
import { route } from "next/dist/server/router";
import Image from "next/image";
import Ilus from "../public/img/ill.png";

export const getServerSideProps = withIronSessionSsr(async function ({ req }) {
  var user = await req.session.user;
  if (!user || !user.access_token) {
    return retObject({ isLogin: false });
  }

  const validationToken = await checkerToken(user);
  if (validationToken.error) {
    await req.session.destroy();
    return redirect("/");
  }

  if (validationToken.status === "refresh") {
    user = {
      isLoggedIn: true,
      access_token: validationToken.access_token,
      refresh_token: validationToken.refresh_token,
    };
    req.session.user = user;
    await req.session.save();
  }

  global.atob = require("atob");

  const uid = JSON.parse(atob(user.access_token.split(".")[1]));
  const checkUids = await checkUid(uid.user_id);
  let outlet = [];
  if (checkUids[0].outlet != "") {
    outlet = await findOutlet(checkUids[0]?.outlet);
  }
  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    adminMode: outlet.length > 0 ? outlet[0]?.shortname : "",
  });
}, sessionOptions);

const Administration = (props) => {
  const router = useRouter();
  // console.log(props.fullName);
  // const [fullname, setfullname] = useState(props.fullName);

  const { globalCtx, globalAct } = useContext(GlobalContext);
  useEffect(() => {
    globalAct.setIsFetch(false);
    globalAct.setErrorMsg("");
    router.prefetch("/config/dashboard");
  }, []);
  {
    /* Default */
  }
  const logout = async () => {
    const body = {
      uri: "logout",
    };
    try {
      const lg = await fetchJson("/api/prot/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      if (error instanceof FetchError) {
        globalAct.setErrorMsg(error.data.message);
      }
      // else {
      //   globalAct.setErrorMsg("An unexpected error happened");
      // }
    }
    await router.push("/");
  };

  return (
    <div className="w-full grid grid-cols-2 min-h-screen overflow-hidden">
      <div className="flex w-full items-center justify-center">
        <div className="absolute z-30 w-2/4">
          <Image
            className="w-full"
            src={Ilus}
            layout={"responsive"}
            objectFit={"cover"}
            width={100}
            height={100}
            priority
          />
        </div>
      </div>
      <div className="w-full min-h-screen relative flex flex-row justify-center items-center gap-4">
        <div className="w-96 h-auto relative">
          {props.isLogin ? (
            <div className="w-full relative select-none ">
              <div className="w-full h-full p-3  overflow-hidden">
                <p className="text-md">Hi {props.fullName},</p>
                <p className="text-sm pb-4">You have logged in</p>
                <div className="w-full h-full relative flex justify-between items-center gap-3">
                  <button
                    onClick={() => {
                      if (props.adminMode != "") {
                        router.push(`/dashboard/outlet/${props.adminMode}`);
                      } else {
                        router.push("/dashboardSKI");
                      }
                    }}
                    className="w-full h-auto bg-blue-50 py-2 overflow-hidden rounded border-2 border-blue-500/50 hover:shadow-md"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => logout()}
                    disabled={globalCtx.isFetch ? "disabled" : ""}
                    className="w-full h-auto bg-red-50 py-2 overflow-hidden rounded border-2 border-red-500/50 hover:shadow-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <FormLogin
                // Default Form
                globalCtx={globalCtx}
                globalAct={globalAct}
                onSubmit={async function handleSubmit(e) {
                  e.preventDefault();
                  globalAct.setIsFetch(true);

                  const body = {
                    username: e.currentTarget.username.value,
                    password: e.currentTarget.password.value,
                    uri: "login",
                  };

                  try {
                    const res = await fetchJson("/api/post", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(body),
                    });
                    if (res.adminMode != "") {
                      router.push(`/dashboard/outlet/${res.adminMode}`);
                    } else {
                      router.push("/dashboardSKI");
                    }
                  } catch (error) {
                    if (error instanceof FetchError) {
                      globalAct.setErrorMsg(error.data.message);
                    } else {
                      globalAct.setErrorMsg("An unexpected error happened");
                    }
                  }

                  globalAct.setIsFetch(false);
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Administration;
