const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./Routes/auth");
const noteRoutes = require("./Routes/notes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 6969;

// ✅ Enable CORS for frontend (React)
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow cookies/auth headers
  })
);

// ✅ Middleware
app.use(bodyParser.json());
app.use(express.json());

// ✅ Serve uploaded files (correct way)
app.use("/files", express.static(path.join(__dirname, "files")));

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("🟢 MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully...");
});

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

// ✅ Start server
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
