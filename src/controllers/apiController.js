// COMMENT

import Comment from "../models/Comment";
import Video from "../models/Video";

// create comment
export const createComment = async (req, res) => {
  const {
    session: { loggedInUser },
    body: { text },
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: loggedInUser._id,
    video: id,
  });
  return res.status(201).json({ newCommentId: comment._id });
};

// delete comment
export const deleteComment = async (req, res) => {
  const {
    session: { loggedInUser },
    params: { id },
  } = req;
  const comment = await Comment.findById(id);
  if (!comment) {
    return res.sendStatus(404);
  }
  if (String(comment.owner) !== loggedInUser._id) {
    return res.sendStatus(404);
  }
  await Comment.findByIdAndDelete(id);
  return res.sendStatus(200);
};
