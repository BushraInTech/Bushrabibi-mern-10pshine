const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileDescription: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
    },
    files: {
      type: String,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // For createdAt and updatedAt
);

module.exports = mongoose.model("Notes", NoteSchema);
