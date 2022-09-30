import express from "express";
import { home } from "../controllers/videoController";
import {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/logout", logout);
globalRouter.route("/signup").get(getSignup).post(postSignup);
globalRouter.route("/login").get(getLogin).post(postLogin);

export default globalRouter;
