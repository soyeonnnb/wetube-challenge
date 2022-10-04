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

/***/ "./src/client/js/like.js":
/*!*******************************!*\
  !*** ./src/client/js/like.js ***!
  \*******************************/
/***/ (() => {

eval("const likeBtn = document.getElementById(\"likeBtn\");\nconst videoContainer = document.getElementById(\"videoContainer\");\n\nconst handleCreateLike = async () => {\n  const {\n    id\n  } = videoContainer.dataset;\n  const response = await fetch(`/api/likes/${id}`, {\n    method: \"POST\"\n  });\n\n  if (response.status === 201) {\n    likeBtn.classList.remove(\"dislike\");\n    likeBtn.classList.add(\"like\");\n    likeBtn.innerText = \"💖\";\n  }\n};\n\nconst handleDeleteLike = async () => {\n  const {\n    id\n  } = videoContainer.dataset;\n  const response = await fetch(`/api/likes/${id}/delete`, {\n    method: \"DELETE\"\n  });\n\n  if (response.status === 200) {\n    likeBtn.classList.remove(\"like\");\n    likeBtn.classList.add(\"dislike\");\n    likeBtn.innerText = \"🤍\";\n  }\n};\n\nconst handleLike = event => {\n  event.preventDefault();\n\n  if (likeBtn.classList.contains(\"like\")) {\n    handleDeleteLike();\n  } else if (likeBtn.classList.contains(\"dislike\")) {\n    handleCreateLike();\n  }\n};\n\nlikeBtn.addEventListener(\"click\", handleLike);\n\n//# sourceURL=webpack://wetube-challenge/./src/client/js/like.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/like.js"]();
/******/ 	
/******/ })()
;