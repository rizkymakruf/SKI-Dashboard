"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/dashboardSKI/category",{

/***/ "./components/form/FormCategory.js":
/*!*****************************************!*\
  !*** ./components/form/FormCategory.js ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ FormCategory; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar _s = $RefreshSig$();\nfunction FormCategory(param) {\n    var globalCtx = param.globalCtx, onSubmit = param.onSubmit;\n    _s();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n    // console.log(\"dkoa\", document.querySelector(\"input[name=category]\").value);\n    }, []);\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"), value = ref[0], setValue = ref[1];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"w-full h-auto\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n            onSubmit: onSubmit,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"w-full h-full select-none\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-full h-full p-3 backdrop-blur bg-white/30 rounded-md border border-gray-300 shadow-md\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"w-full h-auto relative mb-4\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: \"text-sm font-bold text-red-600 mb-2\",\n                                    children: \"Create Main Category\"\n                                }, void 0, false, {\n                                    fileName: \"G:\\\\SKI-Dashboard\\\\components\\\\form\\\\FormCategory.js\",\n                                    lineNumber: 16,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    name: \"category\",\n                                    type: \"text\",\n                                    className: \"placeholder-gray-400 h-10 bg-gray-500/20 form-input mt-1 rounded-md border border-gray-300 w-full focus:ring-2 duration-500 focus:ring-blue-500\",\n                                    placeholder: \"Category Name\",\n                                    disabled: globalCtx.isFetch ? \"disabled\" : \"\"\n                                }, void 0, false, {\n                                    fileName: \"G:\\\\SKI-Dashboard\\\\components\\\\form\\\\FormCategory.js\",\n                                    lineNumber: 19,\n                                    columnNumber: 15\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"G:\\\\SKI-Dashboard\\\\components\\\\form\\\\FormCategory.js\",\n                            lineNumber: 15,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"w-full h-12 flex justify-between gap-2\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"w-full h-full flex items-center text-xs text-red-400\",\n                                    children: globalCtx.errorMsg\n                                }, void 0, false, {\n                                    fileName: \"G:\\\\SKI-Dashboard\\\\components\\\\form\\\\FormCategory.js\",\n                                    lineNumber: 28,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"w-auto h-full flex items-center gap-x-2\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        onClick: function() {\n                                            return reset();\n                                        },\n                                        disabled: globalCtx.isFetch ? \"disabled\" : \"\",\n                                        className: \"px-6 h-8 bg-green-500/30 text-green-500 border-2 shadow-md hover:bg-green-500/50 border-green-300 font-semibold rounded overflow-hidden\",\n                                        children: \"Create\"\n                                    }, void 0, false, {\n                                        fileName: \"G:\\\\SKI-Dashboard\\\\components\\\\form\\\\FormCategory.js\",\n                                        lineNumber: 32,\n                                        columnNumber: 17\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"G:\\\\SKI-Dashboard\\\\components\\\\form\\\\FormCategory.js\",\n                                    lineNumber: 31,\n                                    columnNumber: 15\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"G:\\\\SKI-Dashboard\\\\components\\\\form\\\\FormCategory.js\",\n                            lineNumber: 27,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"G:\\\\SKI-Dashboard\\\\components\\\\form\\\\FormCategory.js\",\n                    lineNumber: 14,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"G:\\\\SKI-Dashboard\\\\components\\\\form\\\\FormCategory.js\",\n                lineNumber: 13,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"G:\\\\SKI-Dashboard\\\\components\\\\form\\\\FormCategory.js\",\n            lineNumber: 12,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"G:\\\\SKI-Dashboard\\\\components\\\\form\\\\FormCategory.js\",\n        lineNumber: 11,\n        columnNumber: 5\n    }, this);\n};\n_s(FormCategory, \"6CSQIzObkVevZrGO6Bg6oTpcQk8=\");\n_c = FormCategory;\nvar _c;\n$RefreshReg$(_c, \"FormCategory\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2Zvcm0vRm9ybUNhdGVnb3J5LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFBb0Q7O0FBRXJDLFNBQVNHLFlBQVksQ0FBQyxLQUF1QixFQUFFO1FBQXZCQyxTQUFTLEdBQVgsS0FBdUIsQ0FBckJBLFNBQVMsRUFBRUMsUUFBUSxHQUFyQixLQUF1QixDQUFWQSxRQUFROztJQUN4REwsZ0RBQVMsQ0FBQyxXQUFNO0lBQ2QsNkVBQTZFO0tBQzlFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFUCxJQUEwQkMsR0FBWSxHQUFaQSwrQ0FBUSxDQUFDLEVBQUUsQ0FBQyxFQVB4QyxLQU9jLEdBQWNBLEdBQVksR0FBMUIsRUFQZCxRQU93QixHQUFJQSxHQUFZLEdBQWhCO0lBRXRCLHFCQUNFLDhEQUFDTyxLQUFHO1FBQUNDLFNBQVMsRUFBQyxlQUFlO2tCQUM1Qiw0RUFBQ0MsTUFBSTtZQUFDTCxRQUFRLEVBQUVBLFFBQVE7c0JBQ3RCLDRFQUFDRyxLQUFHO2dCQUFDQyxTQUFTLEVBQUMsMkJBQTJCOzBCQUN4Qyw0RUFBQ0QsS0FBRztvQkFBQ0MsU0FBUyxFQUFDLHlGQUF5Rjs7c0NBQ3RHLDhEQUFDRCxLQUFHOzRCQUFDQyxTQUFTLEVBQUMsNkJBQTZCOzs4Q0FDMUMsOERBQUNFLEdBQUM7b0NBQUNGLFNBQVMsRUFBQyxxQ0FBcUM7OENBQUMsc0JBRW5EOzs7Ozt3Q0FBSTs4Q0FDSiw4REFBQ0csT0FBSztvQ0FDSkMsSUFBSSxFQUFDLFVBQVU7b0NBQ2ZDLElBQUksRUFBQyxNQUFNO29DQUNYTCxTQUFTLEVBQUMsaUpBQWlKO29DQUMzSk0sV0FBVyxFQUFDLGVBQWU7b0NBQzNCQyxRQUFRLEVBQUVaLFNBQVMsQ0FBQ2EsT0FBTyxHQUFHLFVBQVUsR0FBRyxFQUFFOzs7Ozt3Q0FDN0M7Ozs7OztnQ0FDRTtzQ0FDTiw4REFBQ1QsS0FBRzs0QkFBQ0MsU0FBUyxFQUFDLHdDQUF3Qzs7OENBQ3JELDhEQUFDRCxLQUFHO29DQUFDQyxTQUFTLEVBQUMsc0RBQXNEOzhDQUNsRUwsU0FBUyxDQUFDYyxRQUFROzs7Ozt3Q0FDZjs4Q0FDTiw4REFBQ1YsS0FBRztvQ0FBQ0MsU0FBUyxFQUFDLHlDQUF5Qzs4Q0FDdEQsNEVBQUNVLFFBQU07d0NBQ0xDLE9BQU8sRUFBRTttREFBTUMsS0FBSyxFQUFFO3lDQUFBO3dDQUN0QkwsUUFBUSxFQUFFWixTQUFTLENBQUNhLE9BQU8sR0FBRyxVQUFVLEdBQUcsRUFBRTt3Q0FDN0NSLFNBQVMsRUFBQyx5SUFBeUk7a0RBQ3BKLFFBRUQ7Ozs7OzRDQUFTOzs7Ozt3Q0FDTDs7Ozs7O2dDQUNGOzs7Ozs7d0JBQ0Y7Ozs7O29CQUNGOzs7OztnQkFDRDs7Ozs7WUFDSCxDQUNOO0NBQ0g7R0EzQ3VCTixZQUFZO0FBQVpBLEtBQUFBLFlBQVkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9mb3JtL0Zvcm1DYXRlZ29yeS5qcz8wYzQ4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRm9ybUNhdGVnb3J5KHsgZ2xvYmFsQ3R4LCBvblN1Ym1pdCB9KSB7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiZGtvYVwiLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT1jYXRlZ29yeV1cIikudmFsdWUpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgW3ZhbHVlLCBzZXRWYWx1ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtYXV0b1wiPlxyXG4gICAgICA8Zm9ybSBvblN1Ym1pdD17b25TdWJtaXR9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBzZWxlY3Qtbm9uZVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIHAtMyBiYWNrZHJvcC1ibHVyIGJnLXdoaXRlLzMwIHJvdW5kZWQtbWQgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCBzaGFkb3ctbWRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1hdXRvIHJlbGF0aXZlIG1iLTRcIj5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LXJlZC02MDAgbWItMlwiPlxyXG4gICAgICAgICAgICAgICAgQ3JlYXRlIE1haW4gQ2F0ZWdvcnlcclxuICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICBuYW1lPVwiY2F0ZWdvcnlcIlxyXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicGxhY2Vob2xkZXItZ3JheS00MDAgaC0xMCBiZy1ncmF5LTUwMC8yMCBmb3JtLWlucHV0IG10LTEgcm91bmRlZC1tZCBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHctZnVsbCBmb2N1czpyaW5nLTIgZHVyYXRpb24tNTAwIGZvY3VzOnJpbmctYmx1ZS01MDBcIlxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDYXRlZ29yeSBOYW1lXCJcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtnbG9iYWxDdHguaXNGZXRjaCA/IFwiZGlzYWJsZWRcIiA6IFwiXCJ9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtMTIgZmxleCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIgdGV4dC14cyB0ZXh0LXJlZC00MDBcIj5cclxuICAgICAgICAgICAgICAgIHtnbG9iYWxDdHguZXJyb3JNc2d9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWF1dG8gaC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC14LTJcIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gcmVzZXQoKX1cclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2dsb2JhbEN0eC5pc0ZldGNoID8gXCJkaXNhYmxlZFwiIDogXCJcIn1cclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNiBoLTggYmctZ3JlZW4tNTAwLzMwIHRleHQtZ3JlZW4tNTAwIGJvcmRlci0yIHNoYWRvdy1tZCBob3ZlcjpiZy1ncmVlbi01MDAvNTAgYm9yZGVyLWdyZWVuLTMwMCBmb250LXNlbWlib2xkIHJvdW5kZWQgb3ZlcmZsb3ctaGlkZGVuXCJcclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgQ3JlYXRlXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VSZWYiLCJGb3JtQ2F0ZWdvcnkiLCJnbG9iYWxDdHgiLCJvblN1Ym1pdCIsInZhbHVlIiwic2V0VmFsdWUiLCJkaXYiLCJjbGFzc05hbWUiLCJmb3JtIiwicCIsImlucHV0IiwibmFtZSIsInR5cGUiLCJwbGFjZWhvbGRlciIsImRpc2FibGVkIiwiaXNGZXRjaCIsImVycm9yTXNnIiwiYnV0dG9uIiwib25DbGljayIsInJlc2V0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/form/FormCategory.js\n");

/***/ })

});