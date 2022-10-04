const commentForm = document.getElementById("commentForm");
const videoContainer = document.getElementById("videoContainer");
const commentContainer = document.querySelector("#commentContainer ul");
const deleteBtns = commentContainer.querySelectorAll(".comment__delete");
const editBtns = commentContainer.querySelectorAll(".comment__edit-submit");

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
  const response = await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    li.remove();
  }
};

const handleCommentEdit = async (event) => {
  event.preventDefault();
  const editDiv = event.target.parentElement;
  const textarea = editDiv.querySelector("textarea");
  const text = textarea.value;
  const li = editDiv.parentElement;
  const commentId = li.dataset.id;
  const response = await fetch(`/api/comments/${commentId}/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 200) {
    const span = li.querySelector("span");
    span.innerText = text;
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
if (editBtns) {
  [].forEach.call(editBtns, function (editBtn) {
    editBtn.addEventListener("click", handleCommentEdit);
  });
}
