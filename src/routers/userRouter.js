import express from "express";
import {
  getEditProfile,
  postEditProfile,
  getEditPassword,
  postEditPassword,
} from "../controllers/userController";
import { userUpload } from "../middlewares";

const userRouter = express.Router();

userRouter
  .route("/edit")
  .get(getEditProfile)
  .post(
    userUpload.fields([{ name: "avatar" }, { name: "banner" }]),
    postEditProfile
  );

userRouter
  .route("/change-password")
  .get(getEditPassword)
  .post(postEditPassword);

export default userRouter;
