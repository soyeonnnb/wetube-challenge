import express from "express";
import {
  getUploadVideo,
  postUploadVideo,
  watch,
  getEditVideo,
  postEditVideo,
  searchVideos,
  deleteVideo,
} from "../controllers/videoController";
import { videoUpload, loggedInUserOnly, publicUserOnly } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})/watch", watch);
videoRouter
  .route("/upload")
  .all(loggedInUserOnly)
  .get(getUploadVideo)
  .post(
    videoUpload.fields([{ name: "video" }, { name: "thumb" }]),
    postUploadVideo
  );
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(loggedInUserOnly)
  .get(getEditVideo)
  .post(
    videoUpload.fields([{ name: "video" }, { name: "thumb" }]),
    postEditVideo
  );

videoRouter.get("/:id([0-9a-f]{24})/delete", loggedInUserOnly, deleteVideo);

videoRouter.get("/search", searchVideos);
export default videoRouter;
