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

export const upload = (req, res, fields) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "avatar") {
        cb(null, "uploads/channels/avatars/");
      } else if (file.fieldname === "banner") {
        cb(null, "uploads/channels/banners/");
      }
    },
  });

  const upload = multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * 10,
    },
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  }).fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "banner",
      maxCount: 1,
    },
  ]);
  const checkFileType = (file, cb) => {
    if (file.mimetype === "image/*") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  upload(req, res, (err) => {
    if (err) throw err;
  });
};
