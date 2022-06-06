import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import fetchJson, { FetchError } from "lib/fetchJson";

export default withIronSessionApiRoute(async (req, res) => {
  var resx;

  try {
    resx = await fetchJson(
      `${req.body.type ? process.env.NODE_URL : process.env.SERVICE_URL}${
        req.body.uri
      }`,
      {
        method: `POST`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    if (req.body.uri === "login_office") {
      const user = {
        isLoggedIn: true,
        access_token: resx.access_token,
        refresh_token: resx.refresh_token,
      };
      req.session.user = user;
      await req.session.save();
      resx = { status: "ok" };
    }

    res.status(200).json(resx);
  } catch (error) {
    res.status(400).json({ message: error.data });
  }
}, sessionOptions);
