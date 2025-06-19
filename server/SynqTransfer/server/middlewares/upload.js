// middlewares/upload.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname;
    cb(null, unique);
  }
});

module.exports = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB
});
