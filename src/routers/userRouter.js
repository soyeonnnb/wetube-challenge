import express from "express";
import { getEditProfile, postEditProfile } from "../controllers/userController";
import { channelUpload } from "../middlewares";

const userRouter = express.Router();

userRouter
  .route("/edit")
  .get(getEditProfile)
  .post(
    channelUpload.fields([{ name: "avatar" }, { name: "banner" }]),
    postEditProfile
  );
export default userRouter;
