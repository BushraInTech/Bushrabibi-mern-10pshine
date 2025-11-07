// server/Routes/auth.js
const express = require("express");
const { signup, login } = require("../Controllers/AuthController");
const multer = require("multer");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Apply upload middleware for signup route
router.post("/signup", upload.single("profileImage"), signup);
router.post("/login", login);

module.exports = router;
