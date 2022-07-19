/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/imagekit";
exports.ids = ["pages/api/imagekit"];
exports.modules = {

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "imagekit":
/*!***************************!*\
  !*** external "imagekit" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("imagekit");

/***/ }),

/***/ "(api)/./pages/api/imagekit.js":
/*!*******************************!*\
  !*** ./pages/api/imagekit.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst app = express();\nvar cors = __webpack_require__(/*! cors */ \"cors\");\napp.use(cors());\nconst ImageKit = __webpack_require__(/*! imagekit */ \"imagekit\");\nconst imagekit = new ImageKit({\n    privateKey: \"private_WJAJDzDYK+af5ZiaFc53vKt7hUU=\",\n    publicKey: \"public_z0q9xISwescMx0fNx/TcRk3JG70=\",\n    urlEndpoint: \"https://ik.imagekit.io/madedianpp\"\n});\napp.get(\"/auth\", function(req, res) {\n    var signature = imagekit.getAuthenticationParameters();\n    res.status(200);\n    res.json(signature);\n});\napp.listen(3001, function() {\n    console.log(\"Live at Port 3001\");\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvaW1hZ2VraXQuanMuanMiLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsT0FBTyxHQUFHQyxtQkFBTyxDQUFDLHdCQUFTLENBQUM7QUFDbEMsTUFBTUMsR0FBRyxHQUFHRixPQUFPLEVBQUU7QUFFckIsSUFBSUcsSUFBSSxHQUFHRixtQkFBTyxDQUFDLGtCQUFNLENBQUM7QUFDMUJDLEdBQUcsQ0FBQ0UsR0FBRyxDQUFDRCxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRWhCLE1BQU1FLFFBQVEsR0FBR0osbUJBQU8sQ0FBQywwQkFBVSxDQUFDO0FBQ3BDLE1BQU1LLFFBQVEsR0FBRyxJQUFJRCxRQUFRLENBQUM7SUFDNUJFLFVBQVUsRUFBRSxzQ0FBc0M7SUFDbERDLFNBQVMsRUFBRSxxQ0FBcUM7SUFDaERDLFdBQVcsRUFBRSxtQ0FBbUM7Q0FDakQsQ0FBQztBQUVGUCxHQUFHLENBQUNRLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBVUMsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDbkMsSUFBSUMsU0FBUyxHQUFHUCxRQUFRLENBQUNRLDJCQUEyQixFQUFFO0lBQ3RERixHQUFHLENBQUNHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQkgsR0FBRyxDQUFDSSxJQUFJLENBQUNILFNBQVMsQ0FBQyxDQUFDO0NBQ3JCLENBQUMsQ0FBQztBQUVIWCxHQUFHLENBQUNlLE1BQU0sQ0FBQyxJQUFJLEVBQUUsV0FBWTtJQUMzQkMsT0FBTyxDQUFDQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztDQUNsQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYXNoYm9hcmQtc2tpLy4vcGFnZXMvYXBpL2ltYWdla2l0LmpzP2JlNTYiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xyXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XHJcblxyXG52YXIgY29ycyA9IHJlcXVpcmUoXCJjb3JzXCIpO1xyXG5hcHAudXNlKGNvcnMoKSk7XHJcblxyXG5jb25zdCBJbWFnZUtpdCA9IHJlcXVpcmUoXCJpbWFnZWtpdFwiKTtcclxuY29uc3QgaW1hZ2VraXQgPSBuZXcgSW1hZ2VLaXQoe1xyXG4gIHByaXZhdGVLZXk6IFwicHJpdmF0ZV9XSkFKRHpEWUsrYWY1WmlhRmM1M3ZLdDdoVVU9XCIsXHJcbiAgcHVibGljS2V5OiBcInB1YmxpY196MHE5eElTd2VzY014MGZOeC9UY1JrM0pHNzA9XCIsXHJcbiAgdXJsRW5kcG9pbnQ6IFwiaHR0cHM6Ly9pay5pbWFnZWtpdC5pby9tYWRlZGlhbnBwXCIsXHJcbn0pO1xyXG5cclxuYXBwLmdldChcIi9hdXRoXCIsIGZ1bmN0aW9uIChyZXEsIHJlcykge1xyXG4gIHZhciBzaWduYXR1cmUgPSBpbWFnZWtpdC5nZXRBdXRoZW50aWNhdGlvblBhcmFtZXRlcnMoKTtcclxuICByZXMuc3RhdHVzKDIwMCk7XHJcbiAgcmVzLmpzb24oc2lnbmF0dXJlKTtcclxufSk7XHJcblxyXG5hcHAubGlzdGVuKDMwMDEsIGZ1bmN0aW9uICgpIHtcclxuICBjb25zb2xlLmxvZyhcIkxpdmUgYXQgUG9ydCAzMDAxXCIpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbImV4cHJlc3MiLCJyZXF1aXJlIiwiYXBwIiwiY29ycyIsInVzZSIsIkltYWdlS2l0IiwiaW1hZ2VraXQiLCJwcml2YXRlS2V5IiwicHVibGljS2V5IiwidXJsRW5kcG9pbnQiLCJnZXQiLCJyZXEiLCJyZXMiLCJzaWduYXR1cmUiLCJnZXRBdXRoZW50aWNhdGlvblBhcmFtZXRlcnMiLCJzdGF0dXMiLCJqc29uIiwibGlzdGVuIiwiY29uc29sZSIsImxvZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/imagekit.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/imagekit.js"));
module.exports = __webpack_exports__;

})();