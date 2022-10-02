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

/***/ "./src/client/js/comment.js":
/*!**********************************!*\
  !*** ./src/client/js/comment.js ***!
  \**********************************/
/***/ (() => {

eval("const commentForm = document.getElementById(\"commentForm\");\nconst videoContainer = document.getElementById(\"videoContainer\");\n\nconst addComment = (text, id) => {\n  const commentContainer = document.querySelector(\"#commentContainer ul\");\n  const li = document.createElement(\"li\");\n  li.dataset.id = id;\n  const span = document.createElement(\"span\");\n  span.innerText = text;\n  li.appendChild(span);\n  commentContainer.prepend(li);\n};\n\nconst handleCreateComment = async event => {\n  event.preventDefault();\n  const input = commentForm.querySelector(\"#commentFormInput\");\n  const text = input.value;\n  const videoId = videoContainer.dataset.id;\n\n  if (text === \"\") {\n    return;\n  }\n\n  const response = await fetch(`/api/videos/${videoId}/comment`, {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      text\n    })\n  });\n\n  if (response.status === 201) {\n    const {\n      newCommentId\n    } = await response.json();\n    addComment(text, newCommentId);\n  }\n\n  input.value = \"\";\n};\n\nif (commentForm) {\n  commentForm.addEventListener(\"submit\", handleCreateComment);\n}\n\n//# sourceURL=webpack://wetube-challenge/./src/client/js/comment.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/comment.js"]();
/******/ 	
/******/ })()
;