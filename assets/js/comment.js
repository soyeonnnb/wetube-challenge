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

eval("const commentForm = document.getElementById(\"commentForm\");\nconst videoContainer = document.getElementById(\"videoContainer\");\nconst commentContainer = document.querySelector(\"#commentContainer ul\");\nconst deleteBtns = commentContainer.querySelectorAll(\".comment__delete\");\nconst commentEditForms = commentContainer.querySelectorAll(\".comment__edit\");\nconst commentEditBtns = document.querySelectorAll(\".comment__edit-btn\");\n\nconst addComment = (text, id) => {\n  const noneComment = commentContainer.querySelector(\".comment-none\");\n\n  if (noneComment) {\n    noneComment.remove();\n  } // 너무 복잡하고 req.session 사용 못하면 댓글 내 user 명이나 img를 어떻게 해야할 지 몰라서 지금은 넘김\n\n\n  const li = document.createElement(\"li\");\n  li.dataset.id = id;\n  const span = document.createElement(\"span\");\n  span.innerText = text;\n  li.appendChild(span);\n  commentContainer.prepend(li);\n};\n\nconst handleCommentCreate = async event => {\n  event.preventDefault();\n  const input = commentForm.querySelector(\".commentFormInput\");\n  const text = input.value;\n  const videoId = videoContainer.dataset.id;\n\n  if (text === \"\") {\n    return;\n  }\n\n  const response = await fetch(`/api/videos/${videoId}/comment`, {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      text\n    })\n  });\n\n  if (response.status === 201) {\n    const {\n      newCommentId\n    } = await response.json();\n    addComment(text, newCommentId);\n  }\n\n  textarea.value = \"\";\n};\n\nconst handleCommentDelete = async event => {\n  event.preventDefault();\n  const li = event.target.parentElement.parentElement.parentElement;\n  const commentId = li.dataset.id;\n  const response = await fetch(`/api/comments/${commentId}/delete`, {\n    method: \"DELETE\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    }\n  });\n\n  if (response.status === 200) {\n    li.remove();\n  }\n};\n\nconst handleCommentEdit = async event => {\n  event.preventDefault();\n  const editComment = event.target.parentElement;\n  const input = editComment.querySelector(\".commentEditFormInput\");\n  const text = input.value;\n  const commentId = editComment.dataset.id;\n  const response = await fetch(`/api/comments/${commentId}/edit`, {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      text\n    })\n  });\n\n  if (response.status === 200) {\n    const span = editComment.querySelector(\".comment-text\");\n    span.innerText = text;\n  }\n};\n\nconst handleShowEditForm = event => {\n  event.preventDefault();\n  const li = event.target.parentElement.parentElement.parentElement.parentElement;\n  const form = li.querySelector(\".comment__edit\");\n\n  if (form.classList.contains(\"hidden\")) {\n    form.classList.remove(\"hidden\");\n  } else {\n    form.classList.add(\"hidden\");\n  }\n};\n\nif (commentForm) {\n  commentForm.addEventListener(\"submit\", handleCommentCreate);\n}\n\nif (deleteBtns) {\n  [].forEach.call(deleteBtns, function (deleteBtn) {\n    deleteBtn.addEventListener(\"click\", handleCommentDelete);\n  });\n}\n\nif (commentEditForms) {\n  [].forEach.call(commentEditForms, function (editform) {\n    editform.addEventListener(\"submit\", handleCommentEdit);\n  });\n}\n\nif (commentEditBtns) {\n  [].forEach.call(commentEditBtns, function (editbtn) {\n    editbtn.addEventListener(\"click\", handleShowEditForm);\n  });\n}\n\n//# sourceURL=webpack://wetube-challenge/./src/client/js/comment.js?");

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