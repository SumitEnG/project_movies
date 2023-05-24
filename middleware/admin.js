function admin(req, res, next) {
  if (!req.user.isAdmin) {
    res.status(403).send("access denied,user is not an admin");
    return;
  }
  next();
}
module.exports = admin;
