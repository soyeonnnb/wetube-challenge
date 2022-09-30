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
