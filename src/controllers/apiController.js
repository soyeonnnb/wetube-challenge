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
