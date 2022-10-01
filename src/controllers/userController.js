import User from "../models/User";
import bcrypt from "bcrypt";
// Signup
export const getSignup = (req, res) =>
  res.render("users/signup", { pageTitle: "계정 만들기" });

export const postSignup = async (req, res) => {
  const pageTitle = "계정 만들기";
  const { name, username, email, password, password1 } = req.body;
  const formData = { name, username, email, password, password1 };
  if (password !== password1) {
    return res.status(400).render("users/signup", {
      pageTitle,
      errorMessage: "비밀번호가 일치하지 않습니다",
      formData,
    });
  }
  const existUsername = await User.exists({ username });
  if (existUsername) {
    return res.status(400).render("users/signup", {
      pageTitle,
      errorMessage: "이미 존재하는 사용자 이름입니다",
      formData,
    });
  }
  const existEmail = await User.exists({ email });
  if (existEmail) {
    return res.status(400).render("users/signup", {
      pageTitle,
      errorMessage: "이미 존재하는 이메일입니다",
      formData,
    });
  }
  await User.create({
    name,
    username,
    email,
    password,
    channel: username,
  });
  return res.status(201).redirect("/login");
};

// Login
export const getLogin = (req, res) =>
  res.render("users/login", { pageTitle: "로그인" });

export const postLogin = async (req, res) => {
  const pageTitle = "로그인";
  const { username, password } = req.body;
  const formData = { username, password };
  const user = await User.findOne({ $or: [{ email: username }, { username }] });
  if (!user) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "존재하지 않는 사용자 이름 또는 이메일입니다",
      formData,
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "비밀번호가 올바르지 않습니다",
      formData,
    });
  }
  req.session.loggedIn = true;
  req.session.loggedInUser = user;
  return res.status(200).redirect("/");
};

// Logout
export const logout = (req, res) => {
  req.session.loggedIn = false;
  req.session.loggedInUser = null;
  return res.status(200).redirect("/");
};

// Edit Profile
export const getEditProfile = (req, res) => {
  return res.render("users/edit", {
    pageTitle: "내 정보 수정",
  });
};

export const postEditProfile = async (req, res) => {
  const pageTitle = "내 정보 수정";
  const {
    session: {
      loggedInUser,
      loggedInUser: { _id, avatarUrl, bannerUrl },
    },
    body: { username, name, email, channel, description },
    files: { avatar, banner },
  } = req;
  const formData = { username, name, email, channel, description };
  const existsUsername = await User.findOne({ username });
  if (existsUsername && existsUsername.username !== loggedInUser.username) {
    return res.status(404).render("users/edit", {
      pageTitle,
      errorMessage: "이미 존재하는 사용자 이름입니다.",
      formData,
    });
  }
  const existsEmail = await User.findOne({ email });
  if (existsEmail && existsEmail.email !== loggedInUser.email) {
    return res.status(404).render("users/edit", {
      pageTitle,
      errorMessage: "이미 존재하는 이메일입니다.",
      formData,
    });
  }

  const user = await User.findByIdAndUpdate(_id, {
    username,
    name,
    email,
    channel,
    description,
    avatarUrl: avatar ? avatar[0].path : avatarUrl,
    bannerUrl: banner ? banner[0].path : bannerUrl,
  });
  req.session.loggedInUser = user;
  return res.status(200).redirect(`/channel/${_id}/featured`);
};

// 비밀번호 변경
export const getEditPassword = (req, res) =>
  res.render("users/passwordChange", { pageTitle: "비밀번호 변경" });

export const postEditPassword = async (req, res) => {
  const pageTitle = "비밀번호 변경";
  const { _id } = req.session.loggedInUser;
  const formData = req.body;
  const { oldPw, newPw, new1Pw } = formData;
  if (newPw !== new1Pw) {
    return res.status(404).render("users/passwordChange", {
      pageTitle,
      errorMessage: "비밀번호와 비밀번호 확인이 다릅니다",
      formData,
    });
  }
  const user = await User.findById(_id);
  const match = await bcrypt.compare(oldPw, user.password);
  if (!match) {
    return res.status(404).render("users/passwordChange", {
      pageTitle,
      errorMessage: "기존 비밀번호를 틀렸습니다",
      formData,
    });
  }
  const match1 = await bcrypt.compare(newPw, user.password);
  if (match1) {
    return res.status(404).render("users/passwordChange", {
      pageTitle,
      errorMessage: "새로운 비밀번호는 기존 비밀번호와 달라야 합니다",
      formData,
    });
  }
  user.password = newPw;
  await user.save();
  return res.status(200).redirect("edit");
};
