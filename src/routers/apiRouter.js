import express from "express";
import { registerView } from "../controllers/videoController";
import {
  createComment,
  deleteComment,
  editComment,
  createLike,
  deleteLike,
} from "../controllers/apiController";
import { loggedInUserOnly } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);

// COMMENT
apiRouter.post(
  "/videos/:id([0-9a-f]{24})/comment",
  loggedInUserOnly,
  createComment
);
apiRouter.delete(
  "/comments/:id([0-9a-f]{24})/delete",
  loggedInUserOnly,
  deleteComment
);

apiRouter.post(
  "/comments/:id([0-9a-f]{24})/edit",
  loggedInUserOnly,
  editComment
);

// LIKE
apiRouter.post("/likes/:id([0-9a-f]{24})", loggedInUserOnly, createLike);
apiRouter.delete(
  "/likes/:id([0-9a-f]{24})/delete",
  loggedInUserOnly,
  deleteLike
);

export default apiRouter;
