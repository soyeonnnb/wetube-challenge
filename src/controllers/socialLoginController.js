import User from "../models/User";
import fetch from "node-fetch";

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
      username: `github-${userData.login}`,
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

// naver login
export const naverLoginStart = (req, res) => {
  const base_url = "https://nid.naver.com/oauth2.0/authorize";
  const config = {
    response_type: "code",
    client_id: process.env.NAVER_CLIENT_ID,
    redirect_uri: "http://localhost:4000/users/naver/finish",
    state: "RANDOM_STATE",
  };
  const params = new URLSearchParams(config).toString();
  const final_url = `${base_url}?${params}`;
  return res.redirect(final_url);
};
export const naverLoginFinish = async (req, res) => {
  const { code, state } = req.query;
  const base_url = "https://nid.naver.com/oauth2.0/token";
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.NAVER_CLIENT_ID,
    client_secret: process.env.NAVER_CLIENT_SECRET,
    code,
    state,
  };
  const params = new URLSearchParams(config).toString();
  const final_url = `${base_url}?${params}`;
  const response = await (await fetch(final_url)).json();
  if (!("access_token" in response)) {
    return res.status(404).redirect("/login");
  }
  const access_token = response.access_token;
  const userObj = await (
    await fetch("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
  ).json();
  const userData = userObj.response;
  const email = userData.email;
  let user = await User.findOne({ email });
  if (user) {
    if (user.socialLogin === "NAVER") {
      req.session.loggedIn = true;
      req.session.loggedInUser = user;
      return res.redirect("/");
    }
    return res.redirect("/login");
  }
  user = await User.create({
    username: `naver-${userData.id}`,
    name: userData.name,
    email,
    socialLogin: "NAVER",
    channel: userData.nickname,
    avatarUrl: userData.profile_image ? userData.profile_image : "",
  });
  req.session.loggedIn = true;
  req.session.loggedInUser = user;
  return res.redirect("/");
};
