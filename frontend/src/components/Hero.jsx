import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="bg-unsplashBgImage relative flex h-full items-center justify-center bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[850px] text-center text-white px-4">
        <h1 className="text-4xl font-extrabold md:text-5xl">
          Your Notes. Organized. Anytime. 📚
        </h1>

        <p className="mt-5 text-sm font-light md:text-lg md:font-normal leading-relaxed">
          Welcome to <span className="font-semibold text-blue-300">Smart Notes</span> — 
          your personal space to create, save, and manage notes effortlessly. 
          Stay productive, stay inspired, and keep your ideas safe in one place.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex items-center justify-center gap-5 flex-wrap">
          {isAuthenticated ? (
            <Link
              to="/search"
              className="rounded-xl bg-white px-8 py-3 text-lg font-bold text-blue-600 shadow-lg hover:bg-gray-100 transition"
            >
              Go to My Notes
            </Link>
          ) : (
            <>
              <Link to="/login">
                <button className="rounded-xl bg-white px-7 py-3 font-bold text-blue-600 shadow-lg hover:bg-gray-100 transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-xl bg-transparent border-2 border-white px-7 py-3 font-bold text-white hover:bg-white hover:text-blue-600 transition">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
