export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.loggedInUser = req.session.loggedInUser;
  res.locals.loggedInChannel = req.session.loggedInChannel;
  next();
};
