import express from "express";
import {
  getEditProfile,
  postEditProfile,
  getEditPassword,
  postEditPassword,
} from "../controllers/userController";
import { userUpload, publicUserOnly, loggedInUserOnly } from "../middlewares";

const userRouter = express.Router();

userRouter
  .route("/edit")
  .all(loggedInUserOnly)
  .get(getEditProfile)
  .post(
    userUpload.fields([{ name: "avatar" }, { name: "banner" }]),
    postEditProfile
  );

userRouter
  .route("/change-password")
  .all(loggedInUserOnly)
  .get(getEditPassword)
  .post(postEditPassword);

export default userRouter;
