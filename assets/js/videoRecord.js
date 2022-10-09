/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@ffmpeg/ffmpeg/src/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@ffmpeg/ffmpeg/src/index.js ***!
  \**************************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://wetube-challenge/./node_modules/@ffmpeg/ffmpeg/src/index.js?");

/***/ }),

/***/ "./src/client/js/videoRecord.js":
/*!**************************************!*\
  !*** ./src/client/js/videoRecord.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ffmpeg_ffmpeg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ffmpeg/ffmpeg */ \"./node_modules/@ffmpeg/ffmpeg/src/index.js\");\n/* harmony import */ var _ffmpeg_ffmpeg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ffmpeg_ffmpeg__WEBPACK_IMPORTED_MODULE_0__);\n\nconst video = document.getElementById(\"videoLive__video\");\nconst controllBtn = document.getElementById(\"videoLive__Btn\");\nlet stream;\nlet recorder;\nlet videoFile;\nlet timeoutId;\nconst files = {\n  input: \"recording.webm\",\n  output: \"output.mp4\",\n  thumb: \"thumb.jpg\"\n};\n\nconst downloadFile = (fileUrl, fileName) => {\n  const a = document.createElement(\"a\");\n  a.href = fileUrl;\n  a.download = fileName;\n  document.body.appendChild(a);\n  a.click();\n};\n\nconst handleDownload = async () => {\n  controllBtn.removeEventListener(\"click\", handleDownload);\n  controllBtn.innerText = \"TransCoding...\";\n  controllBtn.disabled = true;\n  const ffmpeg = (0,_ffmpeg_ffmpeg__WEBPACK_IMPORTED_MODULE_0__.createFFmpeg)({\n    log: true\n  });\n  await ffmpeg.load();\n  ffmpeg.FS(\"writeFile\", files.input, await (0,_ffmpeg_ffmpeg__WEBPACK_IMPORTED_MODULE_0__.fetchFile)(videoFile));\n  console.log(\"write\");\n  await ffmpeg.run(\"-i\", files.input, \"-r\", \"60\", files.output);\n  await ffmpeg.run(\"-i\", files.input, \"-ss\", \"00:00:00\", \"frames:v\", \"5\", files.thumb);\n  console.log(\"run\");\n  const mp4File = ffmpeg.FS(\"readFile\", files.output);\n  const thumbFile = ffmpeg.FS(\"readFile\", files.output);\n  const mp4Blob = new Blob([mp4File.buffer], {\n    type: \"video/mp4\"\n  });\n  const thumbBlob = new Blob([thumbFile.buffer], {\n    type: \"video/mp4\"\n  });\n  const mp4Url = URL.createObjectURL(mp4Blob);\n  const thumbUrl = URL.createObjectURL(thumbBlob);\n  downloadFile(mp4Url, \"myRecording.mp4\");\n  downloadFile(thumbUrl, \"thumbnail.jpg\");\n  ffmpeg.FS(\"unlink\", files.input);\n  ffmpeg.FS(\"unlink\", files.output);\n  ffmpeg.FS(\"unlink\", files.thumb);\n  URL.revokeObjectURL(mp4Url);\n  URL.revokeObjectURL(thumbUrl);\n  URL.revokeObjectURL(videoFile);\n  controllBtn.innerText = \"Record Again\";\n  controllBtn.disabled = false;\n  controllBtn.addEventListener(\"click\", handleStart);\n};\n\nconst handleStop = () => {\n  clearTimeout(timeoutId);\n  controllBtn.innerText = \"📃\";\n  controllBtn.removeEventListener(\"click\", handleStop);\n  controllBtn.addEventListener(\"click\", handleDownload);\n  recorder.stop();\n};\n\nconst handleStart = event => {\n  event.preventDefault();\n  controllBtn.innerText = \"녹화 중단\";\n  controllBtn.removeEventListener(\"click\", handleStart);\n  controllBtn.addEventListener(\"click\", handleStop);\n  recorder = new MediaRecorder(stream);\n\n  recorder.ondataavailable = event => {\n    videoFile = URL.createObjectURL(event.data);\n    video.srcObject = null;\n    video.src = videoFile;\n    video.play();\n  };\n\n  recorder.start();\n  timeoutId = setTimeout(() => {\n    handleStop();\n  }, 5000);\n};\n\nconst init = async () => {\n  stream = await navigator.mediaDevices.getUserMedia({\n    audio: true,\n    video: {\n      width: {\n        ideal: 1280\n      },\n      height: {\n        ideal: 720\n      }\n    }\n  });\n  video.srcObject = stream;\n  video.play();\n};\n\ninit();\ncontrollBtn.addEventListener(\"click\", handleStart);\n\n//# sourceURL=webpack://wetube-challenge/./src/client/js/videoRecord.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/js/videoRecord.js");
/******/ 	
/******/ })()
;