import User from "../models/User";
import Video from "../models/Video";
import Comment from "../models/Comment";
import Like from "../models/Like";

export const home = async (req, res) => {
  const videos = await Video.find().populate("owner");
  return res.render("videos/home", { pageTitle: "WeTube", videos });
};

// watch
export const watch = async (req, res) => {
  const { id } = req.params;
  let like;
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.render("404");
  }
  const comments = await Comment.find({ video: video._id }).sort({
    createdAt: -1,
  });
  if (req.session.loggedIn) {
    like = await Like.findOne({
      user: req.session.loggedInUser._id,
      video: id,
    });
  }

  return res.render("videos/watch", {
    pageTitle: video.title,
    video,
    comments,
    like,
  });
};

// upload video
export const getUploadVideo = (req, res) =>
  res.render("videos/upload", {
    pageTitle: "비디오 업로드",
    formBtn: "비디오 업로드",
  });

export const postUploadVideo = async (req, res) => {
  const pageTitle = "비디오 업로드";
  const formBtn = "비디오 업로드";

  const {
    files: { video, thumb },
    body: { title, description, hashtags },
    session: {
      loggedInUser: { _id },
    },
  } = req;
  if (req.fileValidationError) {
    const errorMessage = req.fileValidationError;
    req.fileValidationError = "";
    return res
      .status(400)
      .render("videos/upload", { pageTitle, formBtn, errorMessage });
  }
  try {
    const newVideo = await Video.create({
      fileUrl: video[0].path,
      thumbUrl: thumb ? thumb[0].path : null,
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });
    return res.status(201).redirect(`/videos/${newVideo._id}/watch`);
  } catch (e) {
    console.log(e);
    return res.status(400).render("videos/upload", {
      pageTitle: "비디오 업로드",
      formBtn,
      errorMessage: e,
    });
  }
};

// edit video
export const getEditVideo = async (req, res) => {
  const {
    session: {
      loggedInUser: { _id },
    },
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404");
  }
  if (String(video.owner._id) !== String(_id)) {
    return res.status(403).render("403");
  }
  let hts = "";
  for (var i = 0; i < video.hashtags.length; i++) {
    hts = hts + video.hashtags[i] + " ";
  }
  return res.render("videos/edit", {
    pageTitle: "비디오 수정",
    formBtn: "비디오 수정",
    video,
    hts,
  });
};

export const postEditVideo = async (req, res) => {
  const pageTitle = "비디오 수정";
  const formBtn = "비디오 수정";
  const {
    params: { id },
    files: { video, thumb },
    body: { title, description, hashtags },
  } = req;
  if (req.fileValidationError) {
    const errorMessage = req.fileValidationError;
    req.fileValidationError = "";
    return res
      .status(400)
      .render("videos/edit", { pageTitle, formBtn, errorMessage });
  }
  const nowVideo = await Video.findById(id);
  await Video.findByIdAndUpdate(id, {
    fileUrl: video ? video[0].path : nowVideo.fileUrl,
    thumbUrl: thumb ? thumb[0].path : nowVideo.thumbUrl,
    title,
    description,
    hashtags,
  });
  return res.status(200).redirect("watch");
};

// view + 1
export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

// search
export const searchVideos = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  let channels = [];
  if (keyword) {
    videos = await Video.find({ title: { $regex: new RegExp(keyword, "i") } });
    channels = await User.find({
      channel: { $regex: new RegExp(keyword, "i") },
    });
  }
  if (channels.length > 3) {
    channels = channels.slice(3);
  }
  return res.render("videos/search", { pageTitle: "Search", videos, channels });
};

// delete video
export const deleteVideo = async (req, res) => {
  const {
    session: { loggedInUser },
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).redirect("/");
  }
  if (String(video.owner._id) !== String(loggedInUser._id)) {
    return res.status(403).redirect("watch");
  }
  await Like.deleteMany({ video: id });
  await Video.findByIdAndDelete(id);
  return res.status(200).redirect("/");
};
