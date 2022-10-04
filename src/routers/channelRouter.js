import express from "express";
import {
  feature,
  community,
  about,
  search,
} from "../controllers/channelController";

const channelRouter = express.Router();

channelRouter.get("/:id([0-9a-f]{24})/featured", feature);
channelRouter.get("/:id([0-9a-f]{24})/community", community);
channelRouter.get("/:id([0-9a-f]{24})/about", about);
channelRouter.get("/:id([0-9a-f]{24})/search", search);

export default channelRouter;
