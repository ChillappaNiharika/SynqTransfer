const fileService = require("../services/fileService");
const emailService = require("../services/emailService");
const { createShortLink } = require("../utils/shortener");

exports.upload = async (req, res) => {
  const { toEmail, fromEmail, title, message, option } = req.body;
  if (!req.file) return res.status(400).json({ error: "No file uploaded." });

  try {
    const file = await fileService.saveFile(req.file);
    const fullLink = `${req.protocol}://${req.get("host")}/api/files/${file.uuid}`;
    
    // ✨ Generate your branded short link
    const shortLink = await createShortLink(fullLink);

    if (option === "email") {
      await emailService.sendFileEmail({ to: toEmail, from: fromEmail, title, message, link: shortLink });
      res.json({ message: "Email sent.", file: shortLink });
    } else {
      res.json({ message: "Link generated.", file: shortLink });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
};

exports.download = async (req, res) => {
  try {
    const file = await fileService.getFileByUUID(req.params.uuid);
    if (!file) return res.status(404).json({ error: "File not found or expired." });
    res.download(file.path, file.filename);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Download failed." });
  }
};
