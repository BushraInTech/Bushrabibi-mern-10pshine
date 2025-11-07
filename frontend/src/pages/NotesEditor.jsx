import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const NotesEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);

  const user = useSelector((state) => state.user.userData);
  const userId = user?._id;

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  // ✅ Fetch Notes
  useEffect(() => {
    const fetchNotes = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:6969/notes/getFiles/${userId}`);
        setNotes(res.data.data);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };
    fetchNotes();
  }, [userId]);

  // ✅ Save / Update Note
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const noteData = { title, content, userId };
      let res;

      if (editId) {
        res = await axios.put(`http://localhost:6969/notes/${editId}`, noteData);
        setNotes(notes.map((n) => (n._id === editId ? res.data.note : n)));
        setEditId(null);
      } else {
        res = await axios.post("http://localhost:6969/notes/upload", noteData);
        setNotes([res.data.note, ...notes]);
      }

      setTitle("");
      setContent("");
    } catch (err) {
      console.error(err);
      alert("Failed to save note");
    }
  };

  // ✅ Delete Note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:6969/notes/${id}`);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✅ Edit Note
  const editNote = (note) => {
    setEditId(note._id);
    setTitle(note.fileName);
    setContent(note.fileDescription);
  };

  return (
    <div className="mx-auto w-full max-w-4xl p-5">
      <h1 className="mb-5 text-3xl font-bold text-gray-800 text-center">
        {editId ? "✏️ Edit Note" : "📝 Create a New Note"}
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-5 rounded-2xl shadow-lg border border-gray-200"
      >
        <input
          type="text"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          className="min-h-[200px] bg-white rounded-lg"
        />

        {/* Button immediately below editor */}
        <button
          type="submit"
          className="self-end bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-6 py-2 rounded-lg transition-all mt-2 shadow"
        >
          {editId ? "Update Note" : "Save Note"}
        </button>
      </form>

      {/* Notes Section */}
      <h2 className="text-2xl font-semibold text-gray-700 mt-10 mb-4">Your Notes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center col-span-2">No notes yet.</p>
        ) : (
          notes.map((note) => {
            const createdDate = new Date(note.createdAt);
            const formattedDate = createdDate.toLocaleDateString();
            const formattedTime = createdDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={note._id}
                className="p-4 bg-gradient-to-b from-blue-50 to-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-800 truncate">
                    {note.fileName || "Untitled Note"}
                  </h3>
                  <div className="flex gap-2 text-lg">
                    <button
                      onClick={() => editNote(note)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      onClick={() => deleteNote(note._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>

                <div
                  className="prose prose-sm text-gray-700 mt-1 line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: note.fileDescription }}
                />

                <div className="mt-3 text-xs text-gray-500 border-t border-gray-200 pt-2">
                  <p>Date: {formattedDate}</p>
                  <p>Time: {formattedTime}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotesEditor;
