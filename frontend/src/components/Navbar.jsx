import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaPenNib } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../Redux/slices/user-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    dispatch(removeUserData());
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white shadow-lg backdrop-blur-md">
      <div className="mx-5 flex h-[80px] w-full max-w-[1550px] items-center justify-between">
        {/* Logo */}
        <div className="flex h-[60px] w-[120px] items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="Logo" className="w-full h-auto" />
        </div>

        {/* Hamburger (mobile) */}
        <GiHamburgerMenu className="text-2xl md:hidden cursor-pointer hover:text-yellow-300 transition" />

        {/* Nav Links */}
        <div className="hidden md:flex md:items-center md:gap-6 font-medium">
          <Link
            to="/"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            About
          </Link>

          <Link
            to="/writenotes"
            className="flex items-center gap-1 hover:text-yellow-300 transition-colors duration-200"
          >
            <FaPenNib className="text-[18px]" /> Write Notes
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/search"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                <FaSearch className="text-xl" />
              </Link>

              <Link to="/profile">
                <button className="rounded-xl bg-white/20 px-5 py-2 font-semibold text-white hover:bg-yellow-400 hover:text-black transition-all">
                  Profile
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-white/20 px-5 py-2 font-semibold text-white hover:bg-red-500 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="rounded-xl bg-white/20 px-5 py-2 font-semibold text-white hover:bg-yellow-400 hover:text-black transition-all">
                  Login
                </button>
              </Link>

              <Link to="/signup">
                <button className="rounded-xl bg-white/20 px-5 py-2 font-semibold text-white hover:bg-yellow-400 hover:text-black transition-all">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
