module.exports.setAuthVariable = (req, res, next) => {
  res.locals.isAuthenticated = req.session.userId ? true : false;
  next();
};

// Middleware to protect routes
module.exports.requireAuth = (req, res, next) => {
  if (!req.session.userId) {
      return res.redirect('/signin.html');
  }
  next();
};
