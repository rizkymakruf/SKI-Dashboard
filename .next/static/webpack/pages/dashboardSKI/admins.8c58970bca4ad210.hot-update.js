"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/dashboardSKI/admins",{

/***/ "./pages/dashboardSKI/admins.js":
/*!**************************************!*\
  !*** ./pages/dashboardSKI/admins.js ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__N_SSP\": function() { return /* binding */ __N_SSP; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var components_layout_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! components/layout/Navbar */ \"./components/layout/Navbar.js\");\n/* harmony import */ var context_global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! context/global */ \"./context/global.js\");\n/* harmony import */ var components_card_AddUser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/card/AddUser */ \"./components/card/AddUser.js\");\n/* harmony import */ var components_table_Users__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/table/Users */ \"./components/table/Users.js\");\n/* harmony import */ var components_search_User__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! components/search/User */ \"./components/search/User.js\");\n/* harmony import */ var lib_arangoDb__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lib/arangoDb */ \"./lib/arangoDb.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var lib_fetchJson__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lib/fetchJson */ \"./lib/fetchJson.js\");\nvar _this = undefined;\n\n\n\n\n\n\n\n\n\n\nvar _s = $RefreshSig$();\nvar ManageUsers = function(props) {\n    var _this1 = _this;\n    _s();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(context_global__WEBPACK_IMPORTED_MODULE_3__.GlobalContext), globalCtx = ref.globalCtx, globalAct = ref.globalAct;\n    var router = (0,next_router__WEBPACK_IMPORTED_MODULE_8__.useRouter)();\n    var dataUser = props.users;\n    var ref1 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]), dataSearch = ref1[0], setDataSearch = ref1[1];\n    var ref2 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.totalAdmin), totalRows = ref2[0], setTotalRows = ref2[1];\n    var ref3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(10), perPage = ref3[0], setPerPage = ref3[1];\n    var ref4 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), isSearch = ref4[0], setIsSearch = ref4[1];\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function() {\n        globalAct.setListOutlet(props.listOutlet);\n        globalAct.setFullname(props.fullName);\n        globalAct.setUserPict(props.pict);\n        globalAct.setOutletPict(props.outletPict);\n        globalAct.setSelectedData(props.users[0]);\n        globalAct.setAdminMode(\"ski\");\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"w-full p-3 flex flex-col gap-y-3\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function() {\n                    console.log(\"adduser\");\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(components_card_AddUser__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                        globalAct: globalAct,\n                        globalCtx: globalCtx\n                    }, void 0, false, {\n                        fileName: \"G:\\\\SKI-Dashboard\\\\pages\\\\dashboardSKI\\\\admins.js\",\n                        lineNumber: 105,\n                        columnNumber: 18\n                    }, _this1);\n                }, [])\n            }, void 0, false, {\n                fileName: \"G:\\\\SKI-Dashboard\\\\pages\\\\dashboardSKI\\\\admins.js\",\n                lineNumber: 102,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function() {\n                    console.log(\"searchuser\");\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(components_search_User__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                        setData: setDataSearch,\n                        setTotalRows: setTotalRows,\n                        setIsSearch: setIsSearch\n                    }, void 0, false, {\n                        fileName: \"G:\\\\SKI-Dashboard\\\\pages\\\\dashboardSKI\\\\admins.js\",\n                        lineNumber: 112,\n                        columnNumber: 13\n                    }, _this1);\n                }, [])\n            }, void 0, false, {\n                fileName: \"G:\\\\SKI-Dashboard\\\\pages\\\\dashboardSKI\\\\admins.js\",\n                lineNumber: 108,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function() {\n                    console.log(\"tabel\");\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(components_table_Users__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                        data: isSearch ? dataSearch : dataUser,\n                        search: isSearch,\n                        totalRows: totalRows,\n                        handlePageChange: function(page) {\n                            router.replace(\"/dashboardSKI/admins?start=\".concat((page - 1) * perPage, \"&length=\").concat(perPage));\n                        },\n                        handlePerRowsChange: function(newpage) {\n                            setPerPage(newpage);\n                            router.replace(\"/dashboardSKI/admins?start=0&length=\".concat(newpage));\n                        }\n                    }, void 0, false, {\n                        fileName: \"G:\\\\SKI-Dashboard\\\\pages\\\\dashboardSKI\\\\admins.js\",\n                        lineNumber: 124,\n                        columnNumber: 13\n                    }, _this1);\n                }, [\n                    dataUser,\n                    isSearch\n                ])\n            }, void 0, false, {\n                fileName: \"G:\\\\SKI-Dashboard\\\\pages\\\\dashboardSKI\\\\admins.js\",\n                lineNumber: 120,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"G:\\\\SKI-Dashboard\\\\pages\\\\dashboardSKI\\\\admins.js\",\n        lineNumber: 101,\n        columnNumber: 5\n    }, _this);\n};\n_s(ManageUsers, \"8CpNW3mH2JmqWPkWFC3n2FU0C1A=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_8__.useRouter\n    ];\n});\n_c = ManageUsers;\nvar __N_SSP = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ManageUsers);\nManageUsers.getLayout = components_layout_Navbar__WEBPACK_IMPORTED_MODULE_2__.getLayout;\nvar _c;\n$RefreshReg$(_c, \"ManageUsers\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O29CQUNyQixxQkFDRSw4REFBQ25DLDhEQUFVO3dCQUNUcUMsSUFBSSxFQUFFakIsUUFBUSxHQUFHUCxVQUFVLEdBQUdGLFFBQVE7d0JBQ3RDMkIsTUFBTSxFQUFFbEIsUUFBUTt3QkFDaEJKLFNBQVMsRUFBRUEsU0FBUzt3QkFDcEJ1QixnQkFBZ0IsRUFBRSxTQUFDQyxJQUFJLEVBQUs7NEJBQzFCOUIsTUFBTSxDQUFDK0IsT0FBTyxDQUNaLDZCQUE0QixDQUVqQnZCLE1BQU8sQ0FEaEIsQ0FBQ3NCLElBQUksR0FBRyxDQUFDLENBQUMsR0FBR3RCLE9BQU8sRUFDckIsVUFBUSxDQUFVLFFBQVJBLE9BQU8sQ0FBRSxDQUNyQixDQUFDO3lCQUNIO3dCQUNEd0IsbUJBQW1CLEVBQUUsU0FBQ0MsT0FBTyxFQUFLOzRCQUNoQ3hCLFVBQVUsQ0FBQ3dCLE9BQU8sQ0FBQyxDQUFDOzRCQUNwQmpDLE1BQU0sQ0FBQytCLE9BQU8sQ0FDWixzQ0FBcUMsQ0FBVSxPQUFSRSxPQUFPLENBQUUsQ0FDakQsQ0FBQzt5QkFDSDs7Ozs7OEJBQ0QsQ0FDRjtpQkFDSCxFQUFFO29CQUFDaEMsUUFBUTtvQkFBRVMsUUFBUTtpQkFBQyxDQUFDOzs7OztxQkFDcEI7Ozs7OzthQUNGLENBQ047Q0FDSDtHQWpFS2QsV0FBVzs7UUFFQUgsa0RBQVM7OztBQUZwQkcsS0FBQUEsV0FBVzs7QUFtRWpCLCtEQUFlQSxXQUFXLEVBQUM7QUFDM0JBLFdBQVcsQ0FBQ1QsU0FBUyxHQUFHQSwrREFBUyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL2Rhc2hib2FyZFNLSS9hZG1pbnMuanM/M2I4YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlLCB1c2VNZW1vLCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBnZXRMYXlvdXQgfSBmcm9tIFwiY29tcG9uZW50cy9sYXlvdXQvTmF2YmFyXCI7XHJcbmltcG9ydCB7IEdsb2JhbENvbnRleHQgfSBmcm9tIFwiY29udGV4dC9nbG9iYWxcIjtcclxuXHJcbmltcG9ydCBBZGRVc2VyIGZyb20gXCJjb21wb25lbnRzL2NhcmQvQWRkVXNlclwiO1xyXG5pbXBvcnQgVXNlcnNUYWJsZSBmcm9tIFwiY29tcG9uZW50cy90YWJsZS9Vc2Vyc1wiO1xyXG5pbXBvcnQgU2VhcmNoVXNlciBmcm9tIFwiY29tcG9uZW50cy9zZWFyY2gvVXNlclwiO1xyXG5cclxuaW1wb3J0IHsgd2l0aElyb25TZXNzaW9uU3NyIH0gZnJvbSBcImlyb24tc2Vzc2lvbi9uZXh0XCI7XHJcbmltcG9ydCB7IHNlc3Npb25PcHRpb25zIH0gZnJvbSBcImxpYi9zZXNzaW9uXCI7XHJcbmltcG9ydCB7XHJcbiAgYWxsVXNlcnMsXHJcbiAgZ2V0T3V0bGV0LFxyXG4gIGNoZWNrVWlkLFxyXG4gIGdldFRvdGFsQWRtaW4sXHJcbiAgZmluZE91dGxldCxcclxufSBmcm9tIFwibGliL2FyYW5nb0RiXCI7XHJcbmltcG9ydCB7IHJlZGlyZWN0LCByZXRPYmplY3QsIGNoZWNrZXJUb2tlbiB9IGZyb20gXCJsaWIvbGlzdEZ1bmN0XCI7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xyXG5pbXBvcnQgZmV0Y2hKc29uLCB7IEZldGNoRXJyb3IgfSBmcm9tIFwibGliL2ZldGNoSnNvblwiO1xyXG5cclxuLy8gc3NyXHJcbmV4cG9ydCBjb25zdCBnZXRTZXJ2ZXJTaWRlUHJvcHMgPSB3aXRoSXJvblNlc3Npb25Tc3IoYXN5bmMgZnVuY3Rpb24gKHtcclxuICByZXEsXHJcbiAgcmVzLFxyXG4gIHF1ZXJ5LFxyXG59KSB7XHJcbiAgdmFyIHVzZXIgPSBhd2FpdCByZXEuc2Vzc2lvbi51c2VyO1xyXG4gIGlmICghdXNlciB8fCAhdXNlci5hY2Nlc3NfdG9rZW4pIHtcclxuICAgIC8vIHJldE9iamVjdCh7IGlzTG9naW46IGZhbHNlIH0pO1xyXG4gICAgcmV0dXJuIHJlZGlyZWN0KFwiL1wiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHZhbGlkYXRpb25Ub2tlbiA9IGF3YWl0IGNoZWNrZXJUb2tlbih1c2VyKTtcclxuICBpZiAodmFsaWRhdGlvblRva2VuLmVycm9yKSB7XHJcbiAgICBhd2FpdCByZXEuc2Vzc2lvbi5kZXN0cm95KCk7XHJcbiAgICByZXR1cm4gcmVkaXJlY3QoXCIvXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHZhbGlkYXRpb25Ub2tlbi5zdGF0dXMgPT09IFwicmVmcmVzaFwiKSB7XHJcbiAgICB1c2VyID0ge1xyXG4gICAgICBpc0xvZ2dlZEluOiB0cnVlLFxyXG4gICAgICBhY2Nlc3NfdG9rZW46IHZhbGlkYXRpb25Ub2tlbi5hY2Nlc3NfdG9rZW4sXHJcbiAgICAgIHJlZnJlc2hfdG9rZW46IHZhbGlkYXRpb25Ub2tlbi5yZWZyZXNoX3Rva2VuLFxyXG4gICAgfTtcclxuICAgIHJlcS5zZXNzaW9uLnVzZXIgPSB1c2VyO1xyXG4gICAgYXdhaXQgcmVxLnNlc3Npb24uc2F2ZSgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdWlkID0gSlNPTi5wYXJzZShhdG9iKHVzZXIuYWNjZXNzX3Rva2VuLnNwbGl0KFwiLlwiKVsxXSkpO1xyXG4gIGNvbnN0IGNoZWNrVWlkcyA9IGF3YWl0IGNoZWNrVWlkKHVpZC51c2VyX2lkKTtcclxuXHJcbiAgLy8gbmFhYWFhXHJcbiAgaWYgKGNoZWNrVWlkc1swXS5vdXRsZXQgIT09IFwiXCIpIHtcclxuICAgIHJldHVybiByZWRpcmVjdChcIi9cIik7XHJcbiAgfVxyXG5cclxuICBpZiAoY2hlY2tVaWRzLmxlbmd0aCA8IDEpIHtcclxuICAgIHJldHVybiByZWRpcmVjdChcIi9cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCB1c2VycyA9IGF3YWl0IGFsbFVzZXJzKFxyXG4gICAgcXVlcnkuc3RhcnQgPyBwYXJzZUludChxdWVyeS5zdGFydCkgOiAwLFxyXG4gICAgcXVlcnkubGVuZ3RoID8gcGFyc2VJbnQocXVlcnkubGVuZ3RoKSA6IDEwXHJcbiAgKTtcclxuICBjb25zdCBsaXN0T3V0bGV0ID0gYXdhaXQgZ2V0T3V0bGV0KCk7XHJcbiAgY29uc3QgdG90YWxVc2VyID0gYXdhaXQgZ2V0VG90YWxBZG1pbigpO1xyXG5cclxuICByZXR1cm4gcmV0T2JqZWN0KHtcclxuICAgIGlzTG9naW46IHRydWUsXHJcbiAgICBmdWxsTmFtZTogY2hlY2tVaWRzWzBdLmZ1bGxuYW1lLFxyXG4gICAgcGljdDpcclxuICAgICAgY2hlY2tVaWRzWzBdLnBpY3QgIT09IFwiXCIgPyBjaGVja1VpZHNbMF0ucGljdCA6IFwiL2ltZy91c2VyLWRlZmF1bHQucG5nXCIsXHJcbiAgICBvdXRsZXRQaWN0OiBcIi9pbWcvc2tpLnBuZ1wiLFxyXG4gICAgdXNlcnM6IHVzZXJzLFxyXG4gICAgbGlzdE91dGxldDogbGlzdE91dGxldCxcclxuICAgIHRvdGFsQWRtaW46IHRvdGFsVXNlclswXS50b3RhbCxcclxuICB9KTtcclxufSxcclxuc2Vzc2lvbk9wdGlvbnMpO1xyXG5cclxuY29uc3QgTWFuYWdlVXNlcnMgPSAocHJvcHMpID0+IHtcclxuICBjb25zdCB7IGdsb2JhbEN0eCwgZ2xvYmFsQWN0IH0gPSB1c2VDb250ZXh0KEdsb2JhbENvbnRleHQpO1xyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG4gIGNvbnN0IGRhdGFVc2VyID0gcHJvcHMudXNlcnM7XHJcbiAgY29uc3QgW2RhdGFTZWFyY2gsIHNldERhdGFTZWFyY2hdID0gdXNlU3RhdGUoW10pO1xyXG4gIGNvbnN0IFt0b3RhbFJvd3MsIHNldFRvdGFsUm93c10gPSB1c2VTdGF0ZShwcm9wcy50b3RhbEFkbWluKTtcclxuICBjb25zdCBbcGVyUGFnZSwgc2V0UGVyUGFnZV0gPSB1c2VTdGF0ZSgxMCk7XHJcbiAgY29uc3QgW2lzU2VhcmNoLCBzZXRJc1NlYXJjaF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBnbG9iYWxBY3Quc2V0TGlzdE91dGxldChwcm9wcy5saXN0T3V0bGV0KTtcclxuICAgIGdsb2JhbEFjdC5zZXRGdWxsbmFtZShwcm9wcy5mdWxsTmFtZSk7XHJcbiAgICBnbG9iYWxBY3Quc2V0VXNlclBpY3QocHJvcHMucGljdCk7XHJcbiAgICBnbG9iYWxBY3Quc2V0T3V0bGV0UGljdChwcm9wcy5vdXRsZXRQaWN0KTtcclxuICAgIGdsb2JhbEFjdC5zZXRTZWxlY3RlZERhdGEocHJvcHMudXNlcnNbMF0pO1xyXG4gICAgZ2xvYmFsQWN0LnNldEFkbWluTW9kZShcInNraVwiKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBwLTMgZmxleCBmbGV4LWNvbCBnYXAteS0zXCI+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAge3VzZU1lbW8oKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJhZGR1c2VyXCIpO1xyXG4gICAgICAgICAgcmV0dXJuIDxBZGRVc2VyIGdsb2JhbEFjdD17Z2xvYmFsQWN0fSBnbG9iYWxDdHg9e2dsb2JhbEN0eH0gLz47XHJcbiAgICAgICAgfSwgW10pfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdj5cclxuICAgICAgICB7dXNlTWVtbygoKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInNlYXJjaHVzZXJcIik7XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8U2VhcmNoVXNlclxyXG4gICAgICAgICAgICAgIHNldERhdGE9e3NldERhdGFTZWFyY2h9XHJcbiAgICAgICAgICAgICAgc2V0VG90YWxSb3dzPXtzZXRUb3RhbFJvd3N9XHJcbiAgICAgICAgICAgICAgc2V0SXNTZWFyY2g9e3NldElzU2VhcmNofVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9LCBbXSl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIHt1c2VNZW1vKCgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFiZWxcIik7XHJcbiAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8VXNlcnNUYWJsZVxyXG4gICAgICAgICAgICAgIGRhdGE9e2lzU2VhcmNoID8gZGF0YVNlYXJjaCA6IGRhdGFVc2VyfVxyXG4gICAgICAgICAgICAgIHNlYXJjaD17aXNTZWFyY2h9XHJcbiAgICAgICAgICAgICAgdG90YWxSb3dzPXt0b3RhbFJvd3N9XHJcbiAgICAgICAgICAgICAgaGFuZGxlUGFnZUNoYW5nZT17KHBhZ2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHJvdXRlci5yZXBsYWNlKFxyXG4gICAgICAgICAgICAgICAgICBgL2Rhc2hib2FyZFNLSS9hZG1pbnM/c3RhcnQ9JHtcclxuICAgICAgICAgICAgICAgICAgICAocGFnZSAtIDEpICogcGVyUGFnZVxyXG4gICAgICAgICAgICAgICAgICB9Jmxlbmd0aD0ke3BlclBhZ2V9YFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIGhhbmRsZVBlclJvd3NDaGFuZ2U9eyhuZXdwYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXRQZXJQYWdlKG5ld3BhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcm91dGVyLnJlcGxhY2UoXHJcbiAgICAgICAgICAgICAgICAgIGAvZGFzaGJvYXJkU0tJL2FkbWlucz9zdGFydD0wJmxlbmd0aD0ke25ld3BhZ2V9YFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9LCBbZGF0YVVzZXIsIGlzU2VhcmNoXSl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZVVzZXJzO1xyXG5NYW5hZ2VVc2Vycy5nZXRMYXlvdXQgPSBnZXRMYXlvdXQ7XHJcbiJdLCJuYW1lcyI6WyJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VNZW1vIiwidXNlQ2FsbGJhY2siLCJnZXRMYXlvdXQiLCJHbG9iYWxDb250ZXh0IiwiQWRkVXNlciIsIlVzZXJzVGFibGUiLCJTZWFyY2hVc2VyIiwiZmluZE91dGxldCIsInVzZVJvdXRlciIsImZldGNoSnNvbiIsIkZldGNoRXJyb3IiLCJNYW5hZ2VVc2VycyIsInByb3BzIiwiZ2xvYmFsQ3R4IiwiZ2xvYmFsQWN0Iiwicm91dGVyIiwiZGF0YVVzZXIiLCJ1c2VycyIsImRhdGFTZWFyY2giLCJzZXREYXRhU2VhcmNoIiwidG90YWxBZG1pbiIsInRvdGFsUm93cyIsInNldFRvdGFsUm93cyIsInBlclBhZ2UiLCJzZXRQZXJQYWdlIiwiaXNTZWFyY2giLCJzZXRJc1NlYXJjaCIsInNldExpc3RPdXRsZXQiLCJsaXN0T3V0bGV0Iiwic2V0RnVsbG5hbWUiLCJmdWxsTmFtZSIsInNldFVzZXJQaWN0IiwicGljdCIsInNldE91dGxldFBpY3QiLCJvdXRsZXRQaWN0Iiwic2V0U2VsZWN0ZWREYXRhIiwic2V0QWRtaW5Nb2RlIiwiZGl2IiwiY2xhc3NOYW1lIiwiY29uc29sZSIsImxvZyIsInNldERhdGEiLCJkYXRhIiwic2VhcmNoIiwiaGFuZGxlUGFnZUNoYW5nZSIsInBhZ2UiLCJyZXBsYWNlIiwiaGFuZGxlUGVyUm93c0NoYW5nZSIsIm5ld3BhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/dashboardSKI/admins.js\n");

/***/ })

});