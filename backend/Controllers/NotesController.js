const Notes = require("../Models/Notes");

// Upload / Create Note
const uploadNote = async (req, res) => {
  try {
    const fileName = req.body.title;
    const fileDescription = req.body.content;
    const tags = req.body.tags || "";
    const file = req.file ? req.file.filename : null;
    const uploadedBy = req.body.userId;

    const newNote = new Notes({
      fileName,
      fileDescription,
      tags,
      files: file,
      uploadedBy,
    });

    await newNote.save();
    res.send({ status: "Ok", note: newNote });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Get Notes by User ID
const getNoteByID = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await Notes.find({ uploadedBy: userId });
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// Delete Note
const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    await Notes.findByIdAndDelete(id);
    res.send({ status: "Ok" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit / Update Note
const editNote = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = {
      fileName: req.body.title,
      fileDescription: req.body.content,
      tags: req.body.tags,
    };
    if (req.file) updatedData.files = req.file.filename;

    const updatedNote = await Notes.findByIdAndUpdate(id, updatedData, { new: true });
    res.send({ status: "Ok", note: updatedNote });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Search Notes
const searchNotes = async (req, res) => {
  try {
    const { query, userId } = req.query;

    // Find notes of this user that match the search text (case-insensitive)
    const notes = await Notes.find({
      uploadedBy: userId,
      $or: [
        { fileName: { $regex: query, $options: "i" } },
        { fileDescription: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    });

    res.json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  uploadNote,
  getNoteByID,
  deleteNote,
  editNote,
  searchNotes, // ✅ export added
};
