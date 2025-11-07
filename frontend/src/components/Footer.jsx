import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
      <div className="container mx-auto flex flex-col gap-12 px-8 md:flex-row md:justify-between">
        {/* About */}
        <div className="md:w-[400px]">
          <h2 className="relative mb-4 text-2xl font-extrabold before:absolute before:bottom-[-6px] before:left-0 before:h-[3px] before:w-[60px] before:bg-white">
            About Us
          </h2>
          <p className="text-gray-200 leading-relaxed">
            Because your planning is not always perfect, you need to be able to
            study whenever, wherever. Just read your notes one last time on your
            tablet or phone while you're on the go.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="relative mb-4 text-2xl font-extrabold before:absolute before:bottom-[-6px] before:left-0 before:h-[3px] before:w-[60px] before:bg-white">
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
          <h2 className="relative mb-4 text-2xl font-extrabold before:absolute before:bottom-[-6px] before:left-0 before:h-[3px] before:w-[60px] before:bg-white">
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

      {/* Bottom line */}
      <div className="mt-12 border-t border-white/20 pt-6 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} MyNotes — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
