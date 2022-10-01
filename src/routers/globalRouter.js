import express from "express";
import { home } from "../controllers/videoController";
import {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userController";
import { publicUserOnly, loggedInUserOnly } from "../middlewares";
const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/logout", loggedInUserOnly, logout);
globalRouter
  .route("/signup")
  .all(publicUserOnly)
  .get(getSignup)
  .post(postSignup);
globalRouter.route("/login").all(publicUserOnly).get(getLogin).post(postLogin);

export default globalRouter;
