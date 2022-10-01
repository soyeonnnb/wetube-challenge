import express from "express";
import {
  getUploadVideo,
  postUploadVideo,
  watch,
} from "../controllers/videoController";
import { videoUpload } from "../middlewares";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .get(getUploadVideo)
  .post(
    videoUpload.fields([{ name: "video" }, { name: "thumb" }]),
    postUploadVideo
  );
videoRouter.get("/:id([0-9a-f]{24})/watch", watch);
export default videoRouter;
