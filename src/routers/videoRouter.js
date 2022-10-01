import express from "express";
import {
  getUploadVideo,
  postUploadVideo,
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

export default videoRouter;
