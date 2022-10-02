import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileUrl: { type: String, required: true },
  thumbUrl: { type: String },
  description: { type: String, trim: true },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, required: true },
    likes: { type: Number, default: 0, required: true },
  },
  createdAt: { type: Date, default: Date.now, required: true },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags.split(" ");
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
