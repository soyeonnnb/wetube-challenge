import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/User";
import "./models/Video";
import "./models/Comment";
import "./models/Like";
import app from "./server";

const PORT = 4000;
const handleListening = () =>
  console.log(`🚀 Server Listening on ${PORT}: http://localhost:${PORT}/`);

app.listen(PORT, handleListening);
