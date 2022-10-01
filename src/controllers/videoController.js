import User from "../models/User";
import Video from "../models/Video";

export const home = (req, res) =>
  res.render("videos/home", { pageTitile: "WeTube" });

export const getUploadVideo = (req, res) =>
  res.render("videos/upload", { pageTitle: "비디오 업로드" });

export const postUploadVideo = async (req, res) => {
  const {
    files: { video, thumb },
    body: { title, description, hashtags },
    session: {
      loggedInUser: { _id },
    },
  } = req;
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
    return res.status(400).render("videos/upload", {
      pageTitle: "비디오 업로드",
      errorMessage: e._message,
    });
  }

  return res.end();
};
