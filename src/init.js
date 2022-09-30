import "dotenv/config";
import "./db.js";
import app from "./server.js";

const PORT = 4000;
const handleListening = () =>
  console.log(`🚀 Server Listening on ${PORT}: http://localhost:${PORT}/`);

app.listen(PORT, handleListening);
