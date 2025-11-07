const express = require("express");
const router = express.Router();
const NotesController = require("../Controllers/NotesController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// Routes
router.post("/upload", upload.single("file"), NotesController.uploadNote);
router.put("/:id", upload.single("file"), NotesController.editNote);
router.delete("/:id", NotesController.deleteNote);
router.get("/getFiles/:id", NotesController.getNoteByID);
router.get("/search", NotesController.searchNotes);

module.exports = router;
