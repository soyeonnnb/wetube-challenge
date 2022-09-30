import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  channelName: { type: String, required: true },
  avatarUrl: { type: String, required: false },
  createdAt: { type: Date, required: true, default: Date.now() },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});
const User = mongoose.model("User", userSchema);

export default User;
