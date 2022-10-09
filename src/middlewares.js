import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

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

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  },
});

const multerUserUploader = multerS3({
  s3: s3,
  bucket: "wetube-challenge22",
  key: function (req, file, cb) {
    if (file.fieldname === "avatar") {
      cb(null, `uploads/users/avatars/${Date.now()}-${file.originalname}`);
    } else if (file.fieldname === "banner") {
      cb(null, `uploads/users/banners/${Date.now()}-${file.originalname}`);
    }
  },
  acl: "public-read",
});
const multerVideoUploader = multerS3({
  s3: s3,
  bucket: "wetube-challenge22",
  key: function (req, file, cb) {
    if (file.fieldname === "video") {
      cb(null, `uploads/videos/files/${Date.now()}-${file.originalname}`);
    } else if (file.fieldname === "thumb") {
      cb(null, `uploads/videos/thumbs/${Date.now()}-${file.originalname}`);
    }
  },
  acl: "public-read",
});

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

export const userUpload = multer({
  storage: multerUserUploader,
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

export const videoUpload = multer({
  storage: multerVideoUploader,
  fileFilter: videoFileFilter,
});
/*
const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      cb(null, "uploads/users/avatars/");
    } else if (file.fieldname === "banner") {
      cb(null, "uploads/users/banners/");
    }
  },
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
*/
