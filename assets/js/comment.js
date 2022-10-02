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

eval("const commentForm = document.getElementById(\"commentForm\");\nconst videoContainer = document.getElementById(\"videoContainer\");\nconst commentContainer = document.querySelector(\"#commentContainer ul\");\nconst deleteBtns = commentContainer.querySelectorAll(\".comment__delete\");\nconst editBtns = commentContainer.querySelectorAll(\".comment__edit-submit\");\n\nconst addComment = (text, id) => {\n  const li = document.createElement(\"li\");\n  li.dataset.id = id;\n  const span = document.createElement(\"span\");\n  span.innerText = text;\n  li.appendChild(span);\n  commentContainer.prepend(li);\n};\n\nconst handleCommentCreate = async event => {\n  event.preventDefault();\n  const textarea = commentForm.querySelector(\"textarea\");\n  const text = textarea.value;\n  const videoId = videoContainer.dataset.id;\n\n  if (text === \"\") {\n    return;\n  }\n\n  const response = await fetch(`/api/videos/${videoId}/comment`, {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      text\n    })\n  });\n\n  if (response.status === 201) {\n    const {\n      newCommentId\n    } = await response.json();\n    addComment(text, newCommentId);\n  }\n\n  textarea.value = \"\";\n};\n\nconst handleCommentDelete = async event => {\n  event.preventDefault();\n  const li = event.target.parentElement;\n  const commentId = li.dataset.id;\n  const response = await fetch(`/api/comments/${commentId}/delete`, {\n    method: \"DELETE\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    }\n  });\n\n  if (response.status === 200) {\n    li.remove();\n  }\n\n  console.log(e);\n};\n\nconst handleCommentEdit = async event => {\n  event.preventDefault();\n  const editDiv = event.target.parentElement;\n  const textarea = editDiv.querySelector(\"textarea\");\n  const text = textarea.value;\n  const li = editDiv.parentElement;\n  const commentId = li.dataset.id;\n  const response = await fetch(`/api/comments/${commentId}/edit`, {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      text\n    })\n  });\n\n  if (response.status === 200) {\n    const span = li.querySelector(\"span\");\n    span.innerText = text;\n  }\n};\n\nif (commentForm) {\n  commentForm.addEventListener(\"submit\", handleCommentCreate);\n}\n\nif (deleteBtns) {\n  [].forEach.call(deleteBtns, function (deleteBtn) {\n    deleteBtn.addEventListener(\"click\", handleCommentDelete);\n  });\n}\n\nif (editBtns) {\n  [].forEach.call(editBtns, function (editBtn) {\n    editBtn.addEventListener(\"click\", handleCommentEdit);\n  });\n}\n\n//# sourceURL=webpack://wetube-challenge/./src/client/js/comment.js?");

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