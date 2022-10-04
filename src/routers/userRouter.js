import express from "express";
import {
  getEditProfile,
  postEditProfile,
  getEditPassword,
  postEditPassword,
  githubLoginStart,
  githubLoginFinish,
  commentView,
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

userRouter.get("/github/start", publicUserOnly, githubLoginStart);
userRouter.get("/github/finish", publicUserOnly, githubLoginFinish);
userRouter.get("/comments", loggedInUserOnly, commentView);
export default userRouter;
