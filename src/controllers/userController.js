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
    channelName: username,
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