const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const fileRoutes = require("./routes/files");
const shortenerRoutes = require("./routes/shortener");
const cleanExpiredFiles = require("./services/cleanupService");
const checkOrigin = require("./middlewares/originCheck");

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));

const app = express();
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(origin => origin.trim());
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS policy: Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ✅ Fix upload size issue
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));

app.use(checkOrigin);
app.use("/uploads", express.static("uploads"));
app.use("/api/files", fileRoutes);
app.use("/", shortenerRoutes);


// ping urls
// ping urls
const urlsToPing = [
  "https://synqapp.in"
];

function pingUrls() {
  urlsToPing.forEach(async (url) => {
    try {
      const response = await fetch(url);
      console.log(`✅ Pinged ${url} - Status: ${response.status}`);
    } catch (err) {
      console.error(`❌ Failed to ping ${url}:`, err.message);
    }
  });
}

// Ping every 30 seconds
setInterval(pingUrls, 30 * 1000);
pingUrls();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  setInterval(cleanExpiredFiles, 60 * 60 * 1000); // run every hour
});
