import express from "express";
import {
  getEditProfile,
  postEditProfile,
  getEditPassword,
  postEditPassword,
  commentView,
  deleteUser,
} from "../controllers/userController";
import {
  githubLoginStart,
  githubLoginFinish,
  kakaoLoginStart,
  kakaoLoginFinish,
  naverLoginStart,
  naverLoginFinish,
} from "../controllers/socialLoginController";
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

userRouter.get("/delete", loggedInUserOnly, deleteUser);

userRouter.get("/comments", loggedInUserOnly, commentView);

userRouter.get("/github/start", publicUserOnly, githubLoginStart);
userRouter.get("/github/finish", publicUserOnly, githubLoginFinish);

userRouter.get("/kakao/start", publicUserOnly, kakaoLoginStart);
userRouter.get("/kakao/finish", publicUserOnly, kakaoLoginFinish);

userRouter.get("/naver/start", publicUserOnly, naverLoginStart);
userRouter.get("/naver/finish", publicUserOnly, naverLoginFinish);
export default userRouter;
