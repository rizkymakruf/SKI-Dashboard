"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./context/global.js":
/*!***************************!*\
  !*** ./context/global.js ***!
  \***************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GlobalContext\": function() { return /* binding */ GlobalContext; },\n/* harmony export */   \"GlobalProvider\": function() { return /* binding */ GlobalProvider; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\nvar _this = undefined;\n\n\nvar _s = $RefreshSig$();\nvar GlobalContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nvar GlobalProvider = function(param) {\n    var children = param.children;\n    _s();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"), modal = ref[0], setModal = ref[1];\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"), popover = ref1[0], setPopover = ref1[1];\n    var ref2 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), isFetch = ref2[0], setIsFetch = ref2[1];\n    var ref3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"), errorMsg = ref3[0], setErrorMsg = ref3[1];\n    var ref4 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"), fullname = ref4[0], setFullname = ref4[1];\n    var ref5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"), selectedData = ref5[0], setSelectedData = ref5[1];\n    var ref6 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), listOutlet = ref6[0], setListOutlet = ref6[1];\n    var ref7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), listUser = ref7[0], setListUser = ref7[1];\n    var ref8 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), listBrand = ref8[0], setListBrand = ref8[1];\n    var ref9 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({}), newData = ref9[0], setNewData = ref9[1];\n    var ref10 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), ski = ref10[0], setSki = ref10[1];\n    var contextValue = {\n        globalCtx: {\n            modal: modal,\n            popover: popover,\n            errorMsg: errorMsg,\n            isFetch: isFetch,\n            fullname: fullname,\n            selectedData: selectedData,\n            listOutlet: listOutlet,\n            listUser: listUser,\n            newData: newData,\n            listBrand: listBrand,\n            ski: ski\n        },\n        globalAct: {\n            setModal: setModal,\n            setPopover: setPopover,\n            setErrorMsg: setErrorMsg,\n            setIsFetch: setIsFetch,\n            setFullname: setFullname,\n            setSelectedData: setSelectedData,\n            setListOutlet: setListOutlet,\n            setListUser: setListUser,\n            setNewData: setNewData,\n            setListBrand: setListBrand,\n            setSki: setSki\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(GlobalContext.Provider, {\n        value: contextValue,\n        children: children\n    }, void 0, false, {\n        fileName: \"G:\\\\SKI-Dashboard\\\\context\\\\global.js\",\n        lineNumber: 48,\n        columnNumber: 5\n    }, _this);\n};\n_s(GlobalProvider, \"PJ8lR9ATE7cWgATZaG6tEsP4oBM=\");\n_c = GlobalProvider;\nvar _c;\n$RefreshReg$(_c, \"GlobalProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQVZBLFVBQVU7WUFDVkYsWUFBWSxFQUFaQSxZQUFZO1lBQ1pJLE1BQU0sRUFBTkEsTUFBTTtTQUNQO0tBQ0Y7SUFFRCxxQkFDRSw4REFBQ3hCLGFBQWEsQ0FBQzRCLFFBQVE7UUFBQ0MsS0FBSyxFQUFFSixZQUFZO2tCQUN4Q3ZCLFFBQVE7Ozs7O2FBQ2MsQ0FDekI7Q0FDSCxDQUFDO0dBL0NXRCxjQUFjO0FBQWRBLEtBQUFBLGNBQWMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29udGV4dC9nbG9iYWwuanM/ZWE3NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgY3JlYXRlQ29udGV4dCB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEdsb2JhbENvbnRleHQgPSBjcmVhdGVDb250ZXh0KCk7XHJcblxyXG5leHBvcnQgY29uc3QgR2xvYmFsUHJvdmlkZXIgPSAoeyBjaGlsZHJlbiB9KSA9PiB7XHJcbiAgY29uc3QgW21vZGFsLCBzZXRNb2RhbF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbcG9wb3Zlciwgc2V0UG9wb3Zlcl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbaXNGZXRjaCwgc2V0SXNGZXRjaF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTXNnLCBzZXRFcnJvck1zZ10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZnVsbG5hbWUsIHNldEZ1bGxuYW1lXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZERhdGEsIHNldFNlbGVjdGVkRGF0YV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbbGlzdE91dGxldCwgc2V0TGlzdE91dGxldF0gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2xpc3RVc2VyLCBzZXRMaXN0VXNlcl0gPSB1c2VTdGF0ZShbXSk7XHJcbiAgY29uc3QgW2xpc3RCcmFuZCwgc2V0TGlzdEJyYW5kXSA9IHVzZVN0YXRlKFtdKTtcclxuICBjb25zdCBbbmV3RGF0YSwgc2V0TmV3RGF0YV0gPSB1c2VTdGF0ZSh7fSk7XHJcbiAgY29uc3QgW3NraSwgc2V0U2tpXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgY29udGV4dFZhbHVlID0ge1xyXG4gICAgZ2xvYmFsQ3R4OiB7XHJcbiAgICAgIG1vZGFsLFxyXG4gICAgICBwb3BvdmVyLFxyXG4gICAgICBlcnJvck1zZyxcclxuICAgICAgaXNGZXRjaCxcclxuICAgICAgZnVsbG5hbWUsXHJcbiAgICAgIHNlbGVjdGVkRGF0YSxcclxuICAgICAgbGlzdE91dGxldCxcclxuICAgICAgbGlzdFVzZXIsXHJcbiAgICAgIG5ld0RhdGEsXHJcbiAgICAgIGxpc3RCcmFuZCxcclxuICAgICAgc2tpLFxyXG4gICAgfSxcclxuICAgIGdsb2JhbEFjdDoge1xyXG4gICAgICBzZXRNb2RhbCxcclxuICAgICAgc2V0UG9wb3ZlcixcclxuICAgICAgc2V0RXJyb3JNc2csXHJcbiAgICAgIHNldElzRmV0Y2gsXHJcbiAgICAgIHNldEZ1bGxuYW1lLFxyXG4gICAgICBzZXRTZWxlY3RlZERhdGEsXHJcbiAgICAgIHNldExpc3RPdXRsZXQsXHJcbiAgICAgIHNldExpc3RVc2VyLFxyXG4gICAgICBzZXROZXdEYXRhLFxyXG4gICAgICBzZXRMaXN0QnJhbmQsXHJcbiAgICAgIHNldFNraSxcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxHbG9iYWxDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXtjb250ZXh0VmFsdWV9PlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICA8L0dsb2JhbENvbnRleHQuUHJvdmlkZXI+XHJcbiAgKTtcclxufTtcclxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwiY3JlYXRlQ29udGV4dCIsIkdsb2JhbENvbnRleHQiLCJHbG9iYWxQcm92aWRlciIsImNoaWxkcmVuIiwibW9kYWwiLCJzZXRNb2RhbCIsInBvcG92ZXIiLCJzZXRQb3BvdmVyIiwiaXNGZXRjaCIsInNldElzRmV0Y2giLCJlcnJvck1zZyIsInNldEVycm9yTXNnIiwiZnVsbG5hbWUiLCJzZXRGdWxsbmFtZSIsInNlbGVjdGVkRGF0YSIsInNldFNlbGVjdGVkRGF0YSIsImxpc3RPdXRsZXQiLCJzZXRMaXN0T3V0bGV0IiwibGlzdFVzZXIiLCJzZXRMaXN0VXNlciIsImxpc3RCcmFuZCIsInNldExpc3RCcmFuZCIsIm5ld0RhdGEiLCJzZXROZXdEYXRhIiwic2tpIiwic2V0U2tpIiwiY29udGV4dFZhbHVlIiwiZ2xvYmFsQ3R4IiwiZ2xvYmFsQWN0IiwiUHJvdmlkZXIiLCJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./context/global.js\n");

/***/ })

});