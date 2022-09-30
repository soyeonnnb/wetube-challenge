import express from "express";
import {
  getEditChannel,
  postEditChannel,
  feature,
  community,
  about,
  search,
} from "../controllers/channelController";
import { channelUpload } from "../middlewares";

const channelRouter = express.Router();

channelRouter
  .route("/edit")
  .get(getEditChannel)
  .post(
    channelUpload.fields([{ name: "avatar" }, { name: "banner" }]),
    postEditChannel
  );
channelRouter.get("/:id([0-9a-f]{24})/featured", feature);
channelRouter.get("/:id([0-9a-f]{24})/community", community);
channelRouter.get("/:id([0-9a-f]{24})/about", about);
channelRouter.post("/:id([0-9a-f]{24})/search", search);

export default channelRouter;
