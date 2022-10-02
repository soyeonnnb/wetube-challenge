const videoContainer = document.getElementById("videoContainer");
const video = videoContainer.querySelector("video");

const handleVideoView = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, { method: "POST" });
};

video.addEventListener("ended", handleVideoView);
