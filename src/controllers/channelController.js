import User from "../models/User";
import Channel from "../models/Channel";

// see
export const feature = async (req, res) => {
  const { id } = req.params;
  const channel = await Channel.findById(id);
  if (!channel) {
    return res.status(404).redirect("/");
  }
  return res.render("channels/feature", {
    pageTitle: "channelFeature",
    channel,
  });
};
export const community = async (req, res) => {
  const { id } = req.params;
  const channel = await Channel.findById(id);
  if (!channel) {
    return res.status(404).redirect("/");
  }
  return res.render("channels/community", {
    pageTitle: "channelCommunity",
    channel,
  });
};
export const about = async (req, res) => {
  const { id } = req.params;
  const channel = await Channel.findById(id);
  if (!channel) {
    return res.status(404).redirect("/");
  }
  return res.status(200).render("channels/about", {
    pageTitle: "channelAbout",
    channel,
  });
};
export const search = async (req, res) => {
  const { id } = req.params;
  const channel = await Channel.findById(id);
  if (!channel) {
    return res.status(404).redirect("/");
  }
  return res.render("channels/search", {
    pageTitle: "channelSearch",
    channel,
  });
};

// Edit Channel
export const getEditChannel = (req, res) => {
  const user = req.session.loggedInUser;
  return res.render("channels/editChannel", {
    pageTitle: "내 채널 수정",
    user,
  });
};
export const postEditChannel = (req, res) => {};
