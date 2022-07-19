import ImageKit from "imagekit-javascript";
import { urlEndpoint, publicKey, authenticationEndpoint } from "./imagekit";

var imagekitConfigOptions = { urlEndpoint };

if (publicKey) imagekitConfigOptions.publicKey = publicKey;
if (authenticationEndpoint)
  imagekitConfigOptions.authenticationEndpoint = authenticationEndpoint;

const imagekit = new ImageKit(imagekitConfigOptions);

module.exports.getImagekitUrlFromSrc = function (imageSrc, transformationArr) {
  var ikOptions = {
    src: imageSrc,
    transformation: transformationArr,
  };
  var imageURL = imagekit.url(ikOptions);
  return decodeURIComponent(imageURL);
};

module.exports.getImagekitUrlFromPath = function (
  imagePath,
  transformationArr,
  transformationPostion
) {
  var ikOptions = {
    urlEndpoint,
    path: imagePath,
    transformation: transformationArr,
  };
  if (transformationPostion)
    ikOptions.transformationPostion = transformationPostion;
  var imageURL = imagekit.url(ikOptions);
  return decodeURIComponent(imageURL);
};

module.exports.uploadFile = function (file, name, types) {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file,
        fileName: name,
        tags: [types],
      },
      function (err, result) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(result);
      }
    );
  });
};
