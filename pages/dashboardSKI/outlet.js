import { getLayout } from "components/layout/Navbar";
import DashboardCardSKI from "components/card/DashboardCardSKI";
import { useContext, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { GlobalContext } from "context/global";
import AddOtlet from "components/card/AddOtlet";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { allOutlet, checkUid } from "lib/arangoDb";
import { redirect, retObject, checkerToken } from "lib/listFunct";

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
  query,
}) {
  var user = await req.session.user;
  if (!user || !user.access_token) {
    // retObject({ isLogin: false });
    return redirect("/");
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

  const uid = JSON.parse(atob(user.access_token.split(".")[1]));
  const checkUids = await checkUid(uid.user_id);

  // naaaaa

  const outlet = await allOutlet();

  if (checkUids.length < 1) {
    return redirect("/");
  }

  return retObject({
    isLogin: true,
    fullName: checkUids[0].fullname,
    allOutlet: outlet,
  });
},
sessionOptions);

const Otlets = (props) => {
  const router = useRouter();
  const { globalCtx, globalAct } = useContext(GlobalContext);

  useEffect(() => {
    globalAct.setFullname(props.fullName);
    globalAct.setAdminMode("ski");
  }, []);

  return (
    <div className="w-full p-3 flex flex-col gap-y-4">
      {useMemo(() => {
        console.log("add");
        return <AddOtlet globalAct={globalAct} globalCtx={globalCtx} />;
      }, [])}
      <div>
        <hr />
      </div>

      <div className="w-full grid grid-cols-3 items-center gap-4">
        {useMemo(() => {
          return props.allOutlet.map((dat, idx) => {
            return (
              <div className="w-full">
                <DashboardCardSKI
                  globalAct={globalAct}
                  globalCtx={globalCtx}
                  otlet={dat}
                />
              </div>
            );
          });
        }, [props.allOutlet])}
      </div>
    </div>
  );
};

export default Otlets;
Otlets.getLayout = getLayout;
