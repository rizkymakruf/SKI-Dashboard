/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/dashboard/history/[pid]",{

/***/ "./components/form/FormHistory.js":
/*!****************************************!*\
  !*** ./components/form/FormHistory.js ***!
  \****************************************/
/***/ (function(module) {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports on update so we can compare the boundary
                // signatures.
                module.hot.dispose(function (data) {
                    data.prevExports = currentExports;
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevExports !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevExports !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "./pages/dashboard/history/[pid].js":
/*!******************************************!*\
  !*** ./pages/dashboard/history/[pid].js ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var components_layout_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/layout/Navbar */ \"./components/layout/Navbar.js\");\n/* harmony import */ var context_global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! context/global */ \"./context/global.js\");\n/* harmony import */ var components_table_History__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/table/History */ \"./components/table/History.js\");\n/* harmony import */ var components_form_FormHistory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/form/FormHistory */ \"./components/form/FormHistory.js\");\n/* harmony import */ var components_form_FormHistory__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(components_form_FormHistory__WEBPACK_IMPORTED_MODULE_5__);\nvar _this = undefined;\n\n\n\n\n\n\nvar _s = $RefreshSig$();\nvar History = function() {\n    _s();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(context_global__WEBPACK_IMPORTED_MODULE_3__.GlobalContext), globalAct = ref.globalAct, globalCtx = ref.globalCtx;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"w-full p-2 flex flex-col gap-y-2\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((components_form_FormHistory__WEBPACK_IMPORTED_MODULE_5___default()), {\n                    globalAct: globalAct,\n                    globalCtx: globalCtx\n                }, void 0, false, {\n                    fileName: \"G:\\\\SKI-Dashboard\\\\pages\\\\dashboard\\\\history\\\\[pid].js\",\n                    lineNumber: 12,\n                    columnNumber: 9\n                }, _this)\n            }, void 0, false, {\n                fileName: \"G:\\\\SKI-Dashboard\\\\pages\\\\dashboard\\\\history\\\\[pid].js\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(components_table_History__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                    fileName: \"G:\\\\SKI-Dashboard\\\\pages\\\\dashboard\\\\history\\\\[pid].js\",\n                    lineNumber: 15,\n                    columnNumber: 9\n                }, _this)\n            }, void 0, false, {\n                fileName: \"G:\\\\SKI-Dashboard\\\\pages\\\\dashboard\\\\history\\\\[pid].js\",\n                lineNumber: 14,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"G:\\\\SKI-Dashboard\\\\pages\\\\dashboard\\\\history\\\\[pid].js\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, _this);\n};\n_s(History, \"hTwxGC+rohkk3S1bj+YCQ6cmvHY=\");\n_c = History;\n/* harmony default export */ __webpack_exports__[\"default\"] = (History);\nHistory.getLayout = components_layout_Navbar__WEBPACK_IMPORTED_MODULE_2__.getLayout;\nvar _c;\n$RefreshReg$(_c, \"History\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9kYXNoYm9hcmQvaGlzdG9yeS9bcGlkXS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBQW1DO0FBQ2tCO0FBQ047QUFDSztBQUNFOztBQUV0RCxJQUFNSyxPQUFPLEdBQUcsV0FBTTs7SUFDcEIsSUFBaUNMLEdBQXlCLEdBQXpCQSxpREFBVSxDQUFDRSx5REFBYSxDQUFDLEVBQWxESSxTQUFTLEdBQWdCTixHQUF5QixDQUFsRE0sU0FBUyxFQUFFQyxTQUFTLEdBQUtQLEdBQXlCLENBQXZDTyxTQUFTO0lBQzVCLHFCQUNFLDhEQUFDQyxLQUFHO1FBQUNDLFNBQVMsRUFBQyxrQ0FBa0M7OzBCQUMvQyw4REFBQ0QsS0FBRzswQkFDRiw0RUFBQ0osb0VBQVc7b0JBQUNFLFNBQVMsRUFBRUEsU0FBUztvQkFBRUMsU0FBUyxFQUFFQSxTQUFTOzs7Ozt5QkFBSTs7Ozs7cUJBQ3ZEOzBCQUNOLDhEQUFDQyxLQUFHOzBCQUNGLDRFQUFDTCxnRUFBWTs7Ozt5QkFBRzs7Ozs7cUJBQ1o7Ozs7OzthQUNGLENBQ047Q0FDSDtHQVpLRSxPQUFPO0FBQVBBLEtBQUFBLE9BQU87QUFjYiwrREFBZUEsT0FBTyxFQUFDO0FBQ3ZCQSxPQUFPLENBQUNKLFNBQVMsR0FBR0EsK0RBQVMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9kYXNoYm9hcmQvaGlzdG9yeS9bcGlkXS5qcz9hYzU1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUNvbnRleHQgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgZ2V0TGF5b3V0IH0gZnJvbSBcImNvbXBvbmVudHMvbGF5b3V0L05hdmJhclwiO1xyXG5pbXBvcnQgeyBHbG9iYWxDb250ZXh0IH0gZnJvbSBcImNvbnRleHQvZ2xvYmFsXCI7XHJcbmltcG9ydCBIaXN0b3J5VGFibGUgZnJvbSBcImNvbXBvbmVudHMvdGFibGUvSGlzdG9yeVwiO1xyXG5pbXBvcnQgRm9ybUhpc3RvcnkgZnJvbSBcImNvbXBvbmVudHMvZm9ybS9Gb3JtSGlzdG9yeVwiO1xyXG5cclxuY29uc3QgSGlzdG9yeSA9ICgpID0+IHtcclxuICBjb25zdCB7IGdsb2JhbEFjdCwgZ2xvYmFsQ3R4IH0gPSB1c2VDb250ZXh0KEdsb2JhbENvbnRleHQpO1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBwLTIgZmxleCBmbGV4LWNvbCBnYXAteS0yXCI+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPEZvcm1IaXN0b3J5IGdsb2JhbEFjdD17Z2xvYmFsQWN0fSBnbG9iYWxDdHg9e2dsb2JhbEN0eH0gLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPEhpc3RvcnlUYWJsZSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5O1xyXG5IaXN0b3J5LmdldExheW91dCA9IGdldExheW91dDtcclxuIl0sIm5hbWVzIjpbInVzZUNvbnRleHQiLCJnZXRMYXlvdXQiLCJHbG9iYWxDb250ZXh0IiwiSGlzdG9yeVRhYmxlIiwiRm9ybUhpc3RvcnkiLCJIaXN0b3J5IiwiZ2xvYmFsQWN0IiwiZ2xvYmFsQ3R4IiwiZGl2IiwiY2xhc3NOYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/dashboard/history/[pid].js\n");

/***/ })

});