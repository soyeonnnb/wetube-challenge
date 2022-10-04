import User from "../models/User";
import Video from "../models/Video";
import Comment from "../models/Comment";
import Like from "../models/Like";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

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
  if (req.fileValidationError) {
    const errorMessage = req.fileValidationError;
    req.fileValidationError = "";
    return res.status(404).render("users/edit", {
      pageTitle,
      errorMessage,
      formData,
    });
  }
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
    avatarUrl: avatar ? "/" + avatar[0].path : avatarUrl,
    bannerUrl: banner ? "/" + banner[0].path : bannerUrl,
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

// github login
export const githubLoginStart = (req, res) => {
  const base_url = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT_ID,
    redirect_url: "http://localhost:4000",
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const final_url = `${base_url}?${params}`;
  return res.redirect(final_url);
};
export const githubLoginFinish = async (req, res) => {
  const base_url = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_CLIENT_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const final_url = `${base_url}?${params}`;
  const tokenRequest = await (
    await fetch(final_url, {
      method: "POST",
      headers: { Accept: "application/json" },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const api_url = "https://api.github.com";
    const userData = await (
      await fetch(`${api_url}/user`, {
        method: "GET",
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${api_url}/user/emails`, {
        method: "GET",
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (user) {
      if (user.socialLogin === "GITHUB") {
        req.session.loggedIn = true;
        req.session.loggedInUser = user;
        return res.redirect("/");
      }
      return res.redirect("/login");
    }
    user = await User.create({
      username: userData.login,
      name: userData.name,
      email: emailObj.email,
      socialLogin: "GITHUB",
      channel: userData.login,
      password: "",
    });
    req.session.loggedIn = true;
    req.session.loggedInUser = user;
    return res.redirect("/");
  }
  return res.redirect("/");
};

// user delete
export const deleteUser = async (req, res) => {
  const { _id } = req.session.loggedInUser;
  await User.findByIdAndDelete(_id);
  await Video.deleteMany({ owner: _id });
  await Comment.deleteMany({ owner: _id });
  await Like.deleteMany({ owner: _id });
  req.session.loggedIn = false;
  req.session.loggedInUser = null;
  return res.status(200).redirect("/");
};

// comment view
export const commentView = async (req, res) => {
  const { loggedInUser } = req.session;
  const comments = await Comment.find({ user: loggedInUser._id }).populate(
    "video"
  );
  return res.render("users/comments", { pageTitle: "My Comments", comments });
};

// kakao login
export const kakaoLoginStart = (req, res) => {
  const base_url = "https://kauth.kakao.com/oauth/authorize";
  const config = {
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
    response_type: "code",
    scope: "profile_nickname,account_email,profile_image",
  };
  const params = new URLSearchParams(config).toString();
  const final_url = `${base_url}?${params}`;
  return res.redirect(final_url);
};
export const kakaoLoginFinish = async (req, res) => {
  const { code } = req.query;
  const base_url = "https://kauth.kakao.com/oauth/token";
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
    code,
  };
  const params = new URLSearchParams(config).toString();
  const response = await (
    await fetch(`${base_url}?${params}`, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
  ).json();
  if (!("access_token" in response)) {
    return res.redirect("/");
  }
  const { access_token } = response;
  const response2 = await (
    await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
  ).json();
  if (!("email" in response2.kakao_account)) {
    return res.redirect("/");
  }
  const { kakao_account } = response2;
  let user = await User.findOne({ email: kakao_account.email });
  if (user) {
    if (user.socialLogin === "KAKAO") {
      req.session.loggedIn = true;
      req.session.loggedInUser = user;
      return res.redirect("/");
    }
    return res.redirect("/login");
  }
  user = await User.create({
    username: `kakao-${response2.id}`,
    name: kakao_account.profile.nickname,
    email: kakao_account.email,
    socialLogin: "KAKAO",
    channel: `kakao-${response2.id}`,
    avatarUrl: kakao_account.profile.profile_image_url
      ? kakao_account.profile.profile_image_url
      : "",
  });
  req.session.loggedIn = true;
  req.session.loggedInUser = user;
  return res.redirect("/");
};
