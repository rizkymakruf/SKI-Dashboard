const express = require("express");
const app = express();

var cors = require("cors");
app.use(cors());

const ImageKit = require("imagekit");
const imagekit = new ImageKit({
  privateKey: "private_WJAJDzDYK+af5ZiaFc53vKt7hUU=",
  publicKey: "public_z0q9xISwescMx0fNx/TcRk3JG70=",
  urlEndpoint: "https://ik.imagekit.io/madedianpp",
});

app.get("/auth", function (req, res) {
  var signature = imagekit.getAuthenticationParameters();
  res.status(200);
  res.json(signature);
});

app.listen(3001, function () {
  console.log("Live at Port 3001");
});
