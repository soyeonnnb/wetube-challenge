import express from "express";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import session from "express-session";
import { localsMiddleware } from "./middlewares";

// Router
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import channelRouter from "./routers/channelRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: true,
    resave: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(localsMiddleware);
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/channel", channelRouter);
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "credentialless");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
