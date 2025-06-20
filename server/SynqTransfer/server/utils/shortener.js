const ShortLink = require("../models/ShortLink");
const { nanoid } = require("nanoid");
const dotenv = require("dotenv");

dotenv.config(); // Make sure this is called once at app startup

// utils/shortner.js
exports.createShortLink = async (originalUrl, req) => {
  const slug = nanoid(7);
  await ShortLink.create({ slug, originalUrl });

  // Prefer .env APP_BASE_URL, fallback to request host
  const baseUrl = process.env.APP_BASE_URL || `${req.protocol}://${req.get("host")}`;
  return `${baseUrl}/${slug}`;
};

