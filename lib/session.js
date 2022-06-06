export const sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "alacartebackoffice/sess",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
