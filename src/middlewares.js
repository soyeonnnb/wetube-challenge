import multer from "multer";
export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.loggedInUser = req.session.loggedInUser;
  next();
};

const channelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      cb(null, "uploads/users/avatars/");
    } else if (file.fieldname === "banner") {
      cb(null, "uploads/users/banners/");
    }
  },
});

export const channelUpload = multer({
  storage: channelStorage,
});

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "video") {
      cb(null, "uploads/videos/files/");
    } else if (file.fieldname === "thumb") {
      cb(null, "uploads/videos/thumbs/");
    }
  },
});

export const videoUpload = multer({
  storage: videoStorage,
});
