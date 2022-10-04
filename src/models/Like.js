import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
  createdAt: { type: Date, default: Date.now, required: true },
});

const Like = mongoose.model("Like", likeSchema);

export default Like;
