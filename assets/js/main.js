/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/main.js":
/*!*******************************!*\
  !*** ./src/client/js/main.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/styles.scss */ \"./src/client/scss/styles.scss\");\n\nconst toggleBoxBtns = document.querySelectorAll(\".toggle-box__btn\");\nconst channelSearch = document.getElementById(\"channelSearchBtn\");\nconst videoLiveBtn = document.getElementById(\"videoLiveBtn\");\n\nconst handleToggle = event => {\n  event.preventDefault();\n  const target = event.target;\n  let toggleBox = target.parentElement;\n\n  if (!toggleBox.classList.contains(\"toggle-box\")) {\n    toggleBox = toggleBox.parentElement;\n  }\n\n  const toggleBoxElems = toggleBox.querySelector(\".toggle-box__elems\");\n\n  if (toggleBoxElems.classList.contains(\"hidden\")) {\n    toggleBoxElems.classList.remove(\"hidden\");\n  } else {\n    toggleBoxElems.classList.add(\"hidden\");\n  }\n};\n\nconst handleSearchToggle = event => {\n  event.preventDefault();\n  const parent = event.target.parentElement;\n  let form = parent.querySelector(\"form\");\n\n  if (!form) {\n    form = parent.parentElement.querySelector(\"form\");\n  }\n\n  if (form.classList.contains(\"hidden\")) {\n    form.classList.remove(\"hidden\");\n  } else {\n    form.classList.add(\"hidden\");\n  }\n};\n\nconst handleVideoToggle = event => {\n  event.preventDefault();\n  const videoBox = document.getElementById(\"videoLive\");\n  const video = videoBox.querySelector(\"video\");\n  const btn = videoBox.querySelector(\"button\");\n\n  if (video.classList.contains(\"hidden\")) {\n    video.classList.remove(\"hidden\");\n    btn.classList.remove(\"hidden\");\n  } else {\n    video.classList.add(\"hidden\");\n    btn.classList.add(\"hidden\");\n  }\n};\n\nif (toggleBoxBtns) {\n  toggleBoxBtns.forEach(btn => {\n    btn.addEventListener(\"click\", handleToggle);\n  });\n}\n\nif (channelSearch) {\n  channelSearch.addEventListener(\"click\", handleSearchToggle);\n}\n\nif (videoLiveBtn) {\n  videoLiveBtn.addEventListener(\"click\", handleVideoToggle);\n}\n\n//# sourceURL=webpack://wetube-challenge/./src/client/js/main.js?");

/***/ }),

/***/ "./src/client/scss/styles.scss":
/*!*************************************!*\
  !*** ./src/client/scss/styles.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://wetube-challenge/./src/client/scss/styles.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/js/main.js");
/******/ 	
/******/ })()
;