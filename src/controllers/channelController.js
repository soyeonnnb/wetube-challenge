import User from "../models/User";

// see
export const feature = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).redirect("/");
  }
  return res.render("channels/feature", {
    pageTitle: "channelFeature",
    user,
  });
};
export const community = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).redirect("/");
  }
  return res.render("channels/community", {
    pageTitle: "channelCommunity",
    user,
  });
};
export const about = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).redirect("/");
  }
  return res.status(200).render("channels/about", {
    pageTitle: "channelAbout",
    user,
  });
};
export const search = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).redirect("/");
  }
  return res.render("channels/search", {
    pageTitle: "channelSearch",
    user,
  });
};

// Edit Channel
export const getEditChannel = async (req, res) => {
  const { _id } = req.session.loggedInUser;
  const user = await User.findById(_id);
  return res.render("channels/edit", {
    pageTitle: "내 채널 수정",
    user,
  });
};

export const postEditChannel = async (req, res) => {
  const {
    session: {
      loggedInUser: { _id, avatarUrl, bannerUrl },
    },
    body: { channel, description },
    files: { avatar, banner },
  } = req;
  await User.findByIdAndUpdate(_id, {
    channel,
    description,
    avatarUrl: avatar ? avatar[0].path : avatarUrl,
    bannerUrl: banner ? banner[0].path : bannerUrl,
  });
  return res.status(200).redirect(`${_id}/featured`);
};
