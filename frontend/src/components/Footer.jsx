import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 text-white py-16 relative">
      <div className="container mx-auto flex flex-col gap-12 px-8 md:flex-row md:justify-between">
        {/* About */}
        <div className="md:w-[400px]">
          <h2 className="relative mb-4 text-2xl font-extrabold before:absolute before:bottom-[-6px] before:left-0 before:h-[3px] before:w-[60px] before:bg-yellow-400">
            About Us
          </h2>
          <p className="text-gray-200 leading-relaxed">
            Because your planning is not always perfect, you need to be able to
            study whenever, wherever. Just read your notes one last time on your
            tablet or phone while you're on the go.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-yellow-400 transition-transform transform hover:scale-125"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-pink-400 transition-transform transform hover:scale-125"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-blue-400 transition-transform transform hover:scale-125"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-gray-100 transition-transform transform hover:scale-125"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="relative mb-4 text-2xl font-extrabold before:absolute before:bottom-[-6px] before:left-0 before:h-[3px] before:w-[60px] before:bg-yellow-400">
            Quick Links
          </h2>
          <ul className="space-y-2 text-gray-200">
            <li>
              <Link
                to="/about"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="relative mb-4 text-2xl font-extrabold before:absolute before:bottom-[-6px] before:left-0 before:h-[3px] before:w-[60px] before:bg-yellow-400">
            Contact Info
          </h2>
          <ul className="space-y-2 text-gray-200">
            <li>
              <a href="tel:+919987990097" className="hover:text-yellow-300">
                +91 99879 90097
              </a>
            </li>
            <li>
              <a href="tel:+919764935361" className="hover:text-yellow-300">
                +91 97649 35361
              </a>
            </li>
            <li>
              <a
                href="mailto:findmynotes2022@gmail.com"
                className="hover:text-yellow-300"
              >
                findmynotes2022@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-12 border-t border-white/20 pt-6 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">MyNotes</span> — All rights reserved.
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-6 right-6 bg-yellow-400 text-indigo-800 p-3 rounded-full shadow-lg hover:bg-yellow-300 transition-transform transform hover:scale-110"
      >
        <FaArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
