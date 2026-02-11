import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-50 py-12 px-5 gap-10 lg:gap-20">
      {/* Image Section */}
      <div className="flex justify-center w-full lg:w-1/2">
        <img
          src="./aboutUs.svg"
          alt="About MyNotes"
          className="w-[300px] sm:w-[400px] md:w-[450px] lg:w-[500px] xl:w-[600px] animate-fadeIn"
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 space-y-8">
        {/* About Us */}
        <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-3xl font-bold text-indigo-600 relative mb-3">
            About Us
            <span className="absolute bottom-0 left-0 h-1 w-1/2 bg-indigo-600 rounded-full"></span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg">
            Welcome to <strong>MyNotes</strong>, the ultimate hub for students
            to seamlessly share and access educational resources. Our platform
            is designed to make exchanging study materials effortless,
            fostering a collaborative and enriching academic experience for
            students across colleges.
          </p>
        </div>

        {/* Who We Are */}
        <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-3xl font-bold text-indigo-600 relative mb-3">
            Who We Are
            <span className="absolute bottom-0 left-0 h-1 w-1/2 bg-indigo-600 rounded-full"></span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg">
            <strong>MyNotes</strong> is more than just a platform; it's a
            community-driven initiative fueled by a passion for learning.
            Founded by dedicated students, our team includes tech enthusiasts,
            educators, and creative minds united in the mission to enhance the
            learning landscape.
          </p>
        </div>

        {/* Our Mission */}
        <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-3xl font-bold text-indigo-600 relative mb-3">
            Our Mission
            <span className="absolute bottom-0 left-0 h-1 w-1/2 bg-indigo-600 rounded-full"></span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg">
            At <strong>MyNotes</strong>, our mission is to empower students by
            providing a centralized platform where knowledge knows no
            boundaries. We aim to break down barriers to academic success,
            making valuable study materials accessible to everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
