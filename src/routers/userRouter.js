import express from "express";
import {
  channelFeature,
  channelCommunity,
  channelAbout,
  channelSearch,
  getEditProfile,
  postEditProfile,
} from "../controllers/userController";

const userRouter = express.Router();
userRouter.route("/edit/profile").get(getEditProfile).post(postEditProfile);
// channel 관련
userRouter.get("/channel/:id([0-9a-f]{24})/featured", channelFeature);
userRouter.get("/channel/:id([0-9a-f]{24})/community", channelCommunity);
userRouter.get("/channel/:id([0-9a-f]{24})/about", channelAbout);
userRouter.post("/channel/:id([0-9a-f]{24})/search", channelSearch);

export default userRouter;
