// routes/shortener.js
const express = require("express");
const ShortLink = require("../models/ShortLink");
const router = express.Router();

// Allow both masked and real shortlinks to work
router.get("/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const record = await ShortLink.findOne({ slug });
    if (record) {
      // Redirect to original file download URL
      return res.redirect(record.originalUrl);
    }
    return res.status(404).send("Link not found");
  } catch (err) {
    console.error("Error in shortlink redirect:", err);
    return res.status(500).send("Something went wrong");
  }
});

// OPTIONAL: Handle masked path like /download/:slug if needed
router.get("/download/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const record = await ShortLink.findOne({ slug });
    if (record) {
      return res.redirect(record.originalUrl); // same handling
    }
    return res.status(404).send("Link not found");
  } catch (err) {
    console.error("Masked link error:", err);
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router;
