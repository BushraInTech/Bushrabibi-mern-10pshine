import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const user = useSelector((state) => state.user.userData);
  const userId = user?._id;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || !userId) return;

    try {
      const res = await axios.get(`http://localhost:6969/notes/getFiles/${userId}`);

      if (res.data.data && res.data.data.length > 0) {
        const filtered = res.data.data.filter((note) =>
          note.fileName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filtered.length > 0) {
          setSearchResults(filtered);
          setSearchStatus("Found");
        } else {
          setSearchResults([]);
          setSearchStatus("Not-Found");
        }
      } else {
        setSearchResults([]);
        setSearchStatus("Not-Found");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setSearchResults([]);
      setSearchStatus("Not-Found");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-5 text-white">
      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-[700px] bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="flex items-center px-4 text-gray-300">
            <FaSearch className="text-xl" />
          </div>
          <input
            type="search"
            placeholder="Search notes"
            className="flex-1 bg-gray-800 text-white p-3 text-lg outline-none placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-indigo-600 px-6 hover:bg-indigo-700 transition-colors">
            Search
          </button>
        </form>
      </div>

      {/* Search Results */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {searchStatus === "Found" &&
          searchResults.map((note) => {
            const cleanDescription = note.fileDescription
              ? note.fileDescription.replace(/<\/?[^>]+(>|$)/g, "").trim()
              : "No description";

            const createdDate = new Date(note.createdAt);
            const formattedDate = createdDate.toLocaleDateString();
            const formattedTime = createdDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={note._id}
                onClick={() => setSelectedNote(note)}
                className="cursor-pointer flex flex-col justify-between rounded-2xl bg-gray-800 p-5 shadow-lg hover:scale-105 transition-transform duration-200"
              >
                <h2 className="text-lg font-bold text-indigo-400 truncate mb-2">
                  {note.fileName || "Untitled Note"}
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {cleanDescription.length > 180
                    ? cleanDescription.slice(0, 177) + "..."
                    : cleanDescription}
                </p>
                <div className="mt-3 text-xs text-gray-400">
                  <p>Created: {formattedDate}</p>
                  <p>Time: {formattedTime}</p>
                </div>
              </div>
            );
          })}

        {searchStatus === "Not-Found" && (
          <div className="col-span-full mt-6 text-center text-gray-400 text-lg">
            No Notes Found 😕
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div className="relative w-full max-w-2xl bg-gray-800 rounded-2xl p-6 shadow-2xl text-white animate-fadeIn">
            <button
              onClick={() => setSelectedNote(null)}
              className="absolute top-3 right-4 text-gray-300 hover:text-white text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">
              {selectedNote.fileName || "Untitled Note"}
            </h2>
            <div
              className="text-gray-200 text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: selectedNote.fileDescription }}
            />
            <p className="mt-4 text-xs text-gray-400">
              Created on:{" "}
              {new Date(selectedNote.createdAt).toLocaleDateString()} <br />
              Time:{" "}
              {new Date(selectedNote.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
