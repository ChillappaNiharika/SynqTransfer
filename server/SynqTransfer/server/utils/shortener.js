const ShortLink = require("../models/ShortLink");
const { nanoid } = require("nanoid");
const dotenv = require("dotenv");

dotenv.config(); // Make sure this is called once at app startup

exports.createShortLink = async (originalUrl) => {
  const slug = nanoid(7);
  await ShortLink.create({ slug, originalUrl });

  const baseUrl = process.env.APP_BASE_URL ; // fallback if .env missing
  return `${baseUrl}/${slug}`;
};
