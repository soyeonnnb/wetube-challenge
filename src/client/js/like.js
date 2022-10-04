const likeBtn = document.getElementById("likeBtn");
const videoContainer = document.getElementById("videoContainer");

const handleCreateLike = async () => {
  const { id } = videoContainer.dataset;
  const response = await fetch(`/api/likes/${id}`, {
    method: "POST",
  });
  if (response.status === 201) {
    likeBtn.classList.remove("dislike");
    likeBtn.classList.add("like");
    likeBtn.innerText = "💖";
  }
};

const handleDeleteLike = async () => {
  const { id } = videoContainer.dataset;
  const response = await fetch(`/api/likes/${id}/delete`, {
    method: "DELETE",
  });
  if (response.status === 200) {
    likeBtn.classList.remove("like");
    likeBtn.classList.add("dislike");
    likeBtn.innerText = "🤍";
  }
};

const handleLike = (event) => {
  event.preventDefault();
  if (likeBtn.classList.contains("like")) {
    handleDeleteLike();
  } else if (likeBtn.classList.contains("dislike")) {
    handleCreateLike();
  }
};

likeBtn.addEventListener("click", handleLike);
