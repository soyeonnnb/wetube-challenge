const commentForm = document.getElementById("commentForm");
const videoContainer = document.getElementById("videoContainer");

const addComment = (text, id) => {
  const commentContainer = document.querySelector("#commentContainer ul");
  const li = document.createElement("li");
  li.dataset.id = id;
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);
  commentContainer.prepend(li);
};

const handleCreateComment = async (event) => {
  event.preventDefault();
  const input = commentForm.querySelector("#commentFormInput");
  const text = input.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
  input.value = "";
};

if (commentForm) {
  commentForm.addEventListener("submit", handleCreateComment);
}
