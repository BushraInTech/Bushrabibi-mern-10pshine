import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import About from "./pages/About";
import Upload from "./pages/Upload";
import Faq from "./pages/Faq";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import NotesEditor from "./pages/NotesEditor";

const App = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Router>
      {/* ✅ Navbar visible on all pages */}
      <Navbar />

      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />

          {/* ✅ Protected Routes (only if logged in) */}
          {isAuthenticated ? (
            <>
              <Route path="/writenotes" element={<NotesEditor />} />
              <Route path="/notes" element={<NotesEditor />} /> {/* ✅ added */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/upload" element={<Upload />} />
            </>
          ) : (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}

          {/* ✅ Public Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
