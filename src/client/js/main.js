import "../scss/styles.scss";

const toggleBoxBtns = document.querySelectorAll(".toggle-box__btn");
const channelSearch = document.getElementById("channelSearchBtn");
const videoLiveBtn = document.getElementById("videoLiveBtn");

const handleToggle = (event) => {
  event.preventDefault();
  const target = event.target;
  let toggleBox = target.parentElement;
  if (!toggleBox.classList.contains("toggle-box")) {
    toggleBox = toggleBox.parentElement;
  }
  const toggleBoxElems = toggleBox.querySelector(".toggle-box__elems");
  if (toggleBoxElems.classList.contains("hidden")) {
    toggleBoxElems.classList.remove("hidden");
  } else {
    toggleBoxElems.classList.add("hidden");
  }
};

const handleSearchToggle = (event) => {
  event.preventDefault();
  const parent = event.target.parentElement;
  let form = parent.querySelector("form");
  if (!form) {
    form = parent.parentElement.querySelector("form");
  }
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
  } else {
    form.classList.add("hidden");
  }
};

const handleVideoToggle = (event) => {
  event.preventDefault();
  const videoBox = document.getElementById("videoLive");
  const video = videoBox.querySelector("video");
  const btn = videoBox.querySelector("button");
  if (video.classList.contains("hidden")) {
    video.classList.remove("hidden");
    btn.classList.remove("hidden");
  } else {
    video.classList.add("hidden");
    btn.classList.add("hidden");
  }
};

if (toggleBoxBtns) {
  toggleBoxBtns.forEach((btn) => {
    btn.addEventListener("click", handleToggle);
  });
}

if (channelSearch) {
  channelSearch.addEventListener("click", handleSearchToggle);
}

if (videoLiveBtn) {
  videoLiveBtn.addEventListener("click", handleVideoToggle);
}
