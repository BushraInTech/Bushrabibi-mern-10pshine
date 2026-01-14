import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="relative flex h-full items-center justify-center bg-unsplashBgImage bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>

      {/* Animated Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[850px] text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold animate-fadeInUp">
          Your Notes. Organized. Anytime. 📚
        </h1>

        <p className="mt-5 text-sm md:text-lg font-light md:font-normal leading-relaxed text-gray-200 animate-fadeInUp delay-200">
          Welcome to <span className="font-semibold text-blue-300">Smart Notes</span> — 
          your personal space to create, save, and manage notes effortlessly. 
          Stay productive, stay inspired, and keep your ideas safe in one place.
        </p>

        <p className="mt-3 italic text-gray-400 animate-fadeInUp delay-400">
          “A better note today means a smarter you tomorrow.”
        </p>

        {/* Buttons */}
        <div className="mt-8 flex items-center justify-center gap-5 flex-wrap animate-fadeInUp delay-500">
          {isAuthenticated ? (
            <Link
              to="/search"
              className="rounded-xl bg-white px-8 py-3 text-lg font-bold text-blue-600 shadow-lg hover:bg-gray-100 hover:scale-105 hover:shadow-blue-400/40 transition-all duration-300"
            >
              Go to My Notes
            </Link>
          ) : (
            <>
              <Link to="/login">
                <button className="rounded-xl bg-white px-7 py-3 font-bold text-blue-600 shadow-lg hover:bg-gray-100 hover:scale-105 hover:shadow-blue-400/40 transition-all duration-300">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-xl bg-transparent border-2 border-white px-7 py-3 font-bold text-white hover:bg-white hover:text-blue-600 hover:scale-105 hover:shadow-white/40 transition-all duration-300">
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
