import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  avatarUrl: { type: String, required: false },
  description: { type: String, required: false },
  createdAt: { type: Date, required: true, default: Date.now() },
});
const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
