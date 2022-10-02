import express from "express";
import { createComment } from "../controllers/apiController";
import { loggedInUserOnly } from "../middlewares";

const apiRouter = express.Router();
// COMMENT
apiRouter.post(
  "/videos/:id([0-9a-f]{24})/comment",
  loggedInUserOnly,
  createComment
);

export default apiRouter;
