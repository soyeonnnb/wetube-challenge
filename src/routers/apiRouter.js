import express from "express";
import { createComment, deleteComment } from "../controllers/apiController";
import { loggedInUserOnly } from "../middlewares";

const apiRouter = express.Router();
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
export default apiRouter;
