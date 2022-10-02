const commentForm = document.getElementById("commentForm");
const videoContainer = document.getElementById("videoContainer");
const commentContainer = document.querySelector("#commentContainer ul");
const deleteBtns = commentContainer.querySelectorAll(".comment-delete");

const addComment = (text, id) => {
  const li = document.createElement("li");
  li.dataset.id = id;
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);
  commentContainer.prepend(li);
};

const handleCommentCreate = async (event) => {
  event.preventDefault();
  const textarea = commentForm.querySelector("textarea");
  const text = textarea.value;
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
  textarea.value = "";
};

const handleCommentDelete = async (event) => {
  event.preventDefault();
  const li = event.target.parentElement;
  const commentId = li.dataset.id;
  try {
    const response = await fetch(`/api/comments/${commentId}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      li.remove();
    }
  } catch (e) {
    console.log(e);
  }
};

if (commentForm) {
  commentForm.addEventListener("submit", handleCommentCreate);
}
if (deleteBtns) {
  [].forEach.call(deleteBtns, function (deleteBtn) {
    deleteBtn.addEventListener("click", handleCommentDelete);
  });
}
