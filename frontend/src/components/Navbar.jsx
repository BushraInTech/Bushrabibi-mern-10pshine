import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaPenNib } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../Redux/slices/user-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    dispatch(removeUserData());
    navigate("/");
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 shadow-xl"
          : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700"
      } text-white backdrop-blur-md`}
    >
      <div className="mx-5 flex h-[80px] w-full max-w-[1550px] items-center justify-between">
        {/* Logo */}
        <div className="flex h-[60px] w-[120px] items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="Logo" className="w-full h-auto" />
        </div>

        {/* Hamburger (mobile) */}
        <GiHamburgerMenu
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl md:hidden cursor-pointer hover:text-yellow-300 transition"
        />

        {/* Nav Links */}
        <nav
          className={`${
            menuOpen
              ? "absolute top-[80px] left-0 w-full bg-gradient-to-b from-blue-700 via-purple-700 to-indigo-800 md:hidden p-5 space-y-4"
              : "hidden md:flex md:items-center md:gap-6"
          } font-medium`}
        >
          <Link
            to="/"
            className={`transition-colors duration-200 hover:text-yellow-300 ${
              isActive("/") && "text-yellow-300 font-semibold"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`transition-colors duration-200 hover:text-yellow-300 ${
              isActive("/about") && "text-yellow-300 font-semibold"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>

          <Link
            to="/writenotes"
            className={`flex items-center gap-1 hover:text-yellow-300 transition-colors duration-200 ${
              isActive("/writenotes") && "text-yellow-300 font-semibold"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            <FaPenNib className="text-[18px]" /> Write Notes
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/search"
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                <FaSearch className="text-xl" />
              </Link>

              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                <button className="rounded-xl bg-white/20 px-5 py-2 font-semibold text-white hover:bg-yellow-400 hover:text-black hover:scale-105 transition-all">
                  Profile
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-white/20 px-5 py-2 font-semibold text-white hover:bg-red-500 hover:scale-105 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="rounded-xl bg-white/20 px-5 py-2 font-semibold text-white hover:bg-yellow-400 hover:text-black hover:scale-105 transition-all">
                  Login
                </button>
              </Link>

              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <button className="rounded-xl bg-white/20 px-5 py-2 font-semibold text-white hover:bg-yellow-400 hover:text-black hover:scale-105 transition-all">
                  Signup
                </button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
