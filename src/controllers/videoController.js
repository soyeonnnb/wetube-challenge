import User from "../models/User";
import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find().populate("owner");
  return res.render("videos/home", { pageTitile: "WeTube", videos });
};

export const getUploadVideo = (req, res) =>
  res.render("videos/form", {
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
      .render("videos/form", { pageTitle, formBtn, errorMessage });
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
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    console.log(newVideo);
    return res.status(201).redirect("/");
  } catch (e) {
    console.log(e);
    return res.status(400).render("videos/upload", {
      pageTitle: "비디오 업로드",
      formBtn,
      errorMessage: e,
    });
  }
};

// watch
export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.render("404");
  }
  return res.render("videos/watch", { pageTitle: video.title, video });
};
