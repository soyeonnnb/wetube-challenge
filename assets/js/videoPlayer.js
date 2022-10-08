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

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("const videoContainer = document.getElementById(\"videoContainer\");\nconst video = videoContainer.querySelector(\"video\");\nconst playBtn = document.getElementById(\"play\");\nconst playBtnIcon = playBtn.querySelector(\"i\");\nconst muteBtn = document.getElementById(\"mute\");\nconst muteBtnIcon = muteBtn.querySelector(\"i\");\nconst volumeRange = document.getElementById(\"volume\");\nconst currenTime = document.getElementById(\"currenTime\");\nconst totalTime = document.getElementById(\"totalTime\");\nconst timeline = document.getElementById(\"timeline\");\nconst fullScreenBtn = document.getElementById(\"fullScreen\");\nconst fullScreenIcon = fullScreenBtn.querySelector(\"i\");\nconst videoControls = document.getElementById(\"videoControls\");\nlet controlsTimeout = null;\nlet controlsMovementTimeout = null;\nlet volumeValue = 0.5;\nvideo.volume = volumeValue;\n\nconst handlePlayClick = e => {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  playBtnIcon.classList = video.paused ? \"fas fa-play\" : \"fas fa-pause\";\n};\n\nconst handleMuteClick = e => {\n  if (video.muted) {\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n\n  muteBtnIcon.classList = video.muted ? \"fas fa-volume-mute\" : \"fas fa-volume-up\";\n  volumeRange.value = video.muted ? 0 : volumeValue;\n};\n\nconst handleVolumeChange = event => {\n  const {\n    target: {\n      value\n    }\n  } = event;\n\n  if (video.muted) {\n    video.muted = false;\n    muteBtn.innerText = \"Mute\";\n  }\n\n  volumeValue = value;\n  video.volume = value;\n};\n\nconst formatTime = seconds => new Date(seconds * 1000).toISOString().substr(14, 5);\n\nconst handleLoadedMetadata = () => {\n  totalTime.innerText = formatTime(Math.floor(video.duration));\n  timeline.max = Math.floor(video.duration);\n};\n\nconst handleTimeUpdate = () => {\n  currenTime.innerText = formatTime(Math.floor(video.currentTime));\n  timeline.value = Math.floor(video.currentTime);\n};\n\nconst handleTimelineChange = event => {\n  const {\n    target: {\n      value\n    }\n  } = event;\n  video.currentTime = value;\n};\n\nconst handleFullscreen = () => {\n  const fullscreen = document.fullscreenElement;\n\n  if (fullscreen) {\n    document.exitFullscreen();\n    fullScreenIcon.classList = \"fas fa-expand\";\n  } else {\n    videoContainer.requestFullscreen();\n    fullScreenIcon.classList = \"fas fa-compress\";\n  }\n};\n\nconst hideControls = () => videoControls.classList.remove(\"showing\");\n\nconst handleMouseMove = () => {\n  if (controlsTimeout) {\n    clearTimeout(controlsTimeout);\n    controlsTimeout = null;\n  }\n\n  if (controlsMovementTimeout) {\n    clearTimeout(controlsMovementTimeout);\n    controlsMovementTimeout = null;\n  }\n\n  videoControls.classList.add(\"showing\");\n  controlsMovementTimeout = setTimeout(hideControls, 3000);\n};\n\nconst handleMouseLeave = () => {\n  controlsTimeout = setTimeout(hideControls, 3000);\n};\n\nconst handleVideoView = () => {\n  const {\n    id\n  } = videoContainer.dataset;\n  fetch(`/api/videos/${id}/view`, {\n    method: \"POST\"\n  });\n};\n\nconst handlePlayAndStop = () => {\n  if (video.paused) {\n    video.play();\n    psBtn.className = \"fas fa-pause\";\n  } else {\n    video.pause();\n    psBtn.className = \"fas fa-play\";\n  }\n};\n\nconst handleRequestFullScreen = () => {\n  videoContainer.requestFullscreen();\n};\n\nconst handleExitFullScreen = () => {\n  document.exitFullscreen();\n};\n\nconst handleKeyDown = event => {\n  const keyName = event.key;\n\n  if (keyName === \" \") {\n    handlePlayAndStop();\n    return;\n  }\n\n  if (keyName === \"f\") {\n    const fullscreen = document.fullscreenElement;\n\n    if (!fullscreen) {\n      handleRequestFullScreen();\n    }\n\n    return;\n  }\n\n  if (keyName === \"Escape\") {\n    const fullscreen = document.fullscreenElement;\n\n    if (fullscreen) {\n      handleExitFullScreen();\n    }\n\n    return;\n  }\n};\n\nplayBtn.addEventListener(\"click\", handlePlayClick);\nmuteBtn.addEventListener(\"click\", handleMuteClick);\nvolumeRange.addEventListener(\"input\", handleVolumeChange);\nvideo.addEventListener(\"loadeddata\", handleLoadedMetadata);\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate);\nvideoContainer.addEventListener(\"mousemove\", handleMouseMove);\nvideoContainer.addEventListener(\"mouseleave\", handleMouseLeave);\ntimeline.addEventListener(\"input\", handleTimelineChange);\nfullScreenBtn.addEventListener(\"click\", handleFullscreen);\nvideo.addEventListener(\"ended\", handleVideoView);\ndocument.addEventListener(\"keydown\", handleKeyDown);\n\n//# sourceURL=webpack://wetube-challenge/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;