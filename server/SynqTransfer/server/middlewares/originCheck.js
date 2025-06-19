// middlewares/originCheck.js
module.exports = function checkOrigin(req, res, next) {
  const allowedOrigin = process.env.ALLOWED_ORIGINS?.split(',').map(origin => origin.trim()) || []; // Replace with your domain
  const origin = req.get("origin") || req.get("referer");

  if (origin && origin.startsWith(allowedOrigin)) {
    next();
  } else {
    return res.status(403).json({ error: "Access denied: Invalid origin" });
  }
};
