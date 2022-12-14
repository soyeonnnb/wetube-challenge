import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  socialLogin: { type: String, enum: ["GITHUB", "KAKAO", "NAVER"] },
  channel: { type: String, required: true },
  avatarUrl: { type: String, required: false },
  bannerUrl: { type: String, required: false },
  description: { type: String, required: false },
  createdAt: { type: Date, required: true, default: Date.now },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});
const User = mongoose.model("User", userSchema);

export default User;
