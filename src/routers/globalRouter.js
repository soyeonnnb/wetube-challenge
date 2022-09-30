import express from "express";
import { home } from "../controllers/videoController";
import {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/signup").get(getSignup).post(postSignup);
globalRouter.route("/login").get(getLogin).post(postLogin);

export default globalRouter;
