import multer from "multer";
export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.loggedInUser = req.session.loggedInUser;
  next();
};

export const publicUserOnly = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.status(403).redirect("/");
  }
};
export const loggedInUserOnly = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.status(403).redirect("/login");
  }
};

// user fileupload
const userFileFilter = (req, file, cb) => {
  const typeArray = file.mimetype.split("/");
  const fileType = typeArray[1];
  if (
    fileType == "jpg" ||
    fileType == "png" ||
    fileType == "jpeg" ||
    fileType == "webp"
  ) {
    req.fileValidationError = null;
    cb(null, true);
  } else {
    req.fileValidationError = "jpg, jpeg, png, webp 파일만 업로드 가능합니다.";
    cb(null, false);
  }
};
const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      cb(null, "uploads/users/avatars/");
    } else if (file.fieldname === "banner") {
      cb(null, "uploads/users/banners/");
    }
  },
});

export const userUpload = multer({
  storage: userStorage,
  fileFilter: userFileFilter,
});

// video fileupload
const videoFileFilter = (req, file, cb) => {
  const typeArray = file.mimetype.split("/");
  const fileType = typeArray[1];

  if (file.fieldname === "video") {
    if (
      fileType == "mov" ||
      fileType == "mp4" ||
      fileType == "mpeg" ||
      fileType == "avi" ||
      fileType == "webm"
    ) {
      req.fileValidationError = null;
      cb(null, true);
    } else {
      req.fileValidationError =
        "mov, mp4, mpeg, avi, webm 파일만 업로드 가능합니다.";
      cb(null, false);
    }
  } else if (file.fieldname === "thumb") {
    if (
      fileType == "jpg" ||
      fileType == "png" ||
      fileType == "jpeg" ||
      fileType == "webp"
    ) {
      req.fileValidationError = null;
      cb(null, true);
    } else {
      req.fileValidationError =
        "jpg, jpeg, png, webp 파일만 업로드 가능합니다.";
      cb(null, false);
    }
  }
};

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
  fileFilter: videoFileFilter,
});
