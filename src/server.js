import express from "express";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import session from "express-session";

// Router
import globalRouter from "./routers/globalRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: true,
    resave: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(logger);
app.use("/", globalRouter);

export default app;
