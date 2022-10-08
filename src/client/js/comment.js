const commentForm = document.getElementById("commentForm");
const videoContainer = document.getElementById("videoContainer");
const commentContainer = document.querySelector("#commentContainer ul");
const deleteBtns = commentContainer.querySelectorAll(".comment__delete");
const commentEditForms = commentContainer.querySelectorAll(".comment__edit");
const commentEditBtns = document.querySelectorAll(".comment__edit-btn");

const addComment = (text, id) => {
  const noneComment = commentContainer.querySelector(".comment-none");
  if (noneComment) {
    noneComment.remove();
  }
  // 너무 복잡하고 req.session 사용 못하면 댓글 내 user 명이나 img를 어떻게 해야할 지 몰라서 지금은 넘김
  const li = document.createElement("li");
  li.dataset.id = id;
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);
  commentContainer.prepend(li);
};

const handleCommentCreate = async (event) => {
  event.preventDefault();
  const input = commentForm.querySelector(".commentFormInput");
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
  textarea.value = "";
};

const handleCommentDelete = async (event) => {
  event.preventDefault();
  const li = event.target.parentElement.parentElement.parentElement;
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
  const editComment = event.target.parentElement;
  const input = editComment.querySelector(".commentEditFormInput");
  const text = input.value;
  const commentId = editComment.dataset.id;
  const response = await fetch(`/api/comments/${commentId}/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 200) {
    const span = editComment.querySelector(".comment-text");
    span.innerText = text;
  }
};
const handleShowEditForm = (event) => {
  event.preventDefault();
  const li =
    event.target.parentElement.parentElement.parentElement.parentElement;
  const form = li.querySelector(".comment__edit");
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
  } else {
    form.classList.add("hidden");
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
if (commentEditForms) {
  [].forEach.call(commentEditForms, function (editform) {
    editform.addEventListener("submit", handleCommentEdit);
  });
}

if (commentEditBtns) {
  [].forEach.call(commentEditBtns, function (editbtn) {
    editbtn.addEventListener("click", handleShowEditForm);
  });
}
