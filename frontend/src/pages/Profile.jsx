import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Redux user data:", user);
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-black text-white">
        <p className="animate-pulse text-xl font-semibold tracking-wide">
          Loading profile...
        </p>
      </div>
    );
  }

  const imageUrl = user.profileImage
    ? `http://localhost:6969${
        user.profileImage.startsWith("/files")
          ? user.profileImage
          : `/files/${user.profileImage}`
      }`
    : "/default-avatar.png";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-black text-white p-6">
      {/* Profile Card */}
      <div className="bg-gray-800/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 hover:shadow-sky-400/40 transition duration-300">
        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="h-[160px] w-[160px] rounded-full overflow-hidden border-4 border-sky-400 shadow-lg shadow-sky-400/40 transition-transform duration-300 hover:scale-105">
            <img
              src={imageUrl}
              alt="profile"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
          </div>
        </div>

        {/* User Info */}
        <div className="mt-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-sky-400">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-400 mt-1 text-sm">@{user.userName}</p>
          <p className="text-gray-300 italic mt-3">
            {user.userBio || "No bio added yet"}
          </p>
        </div>

        {/* Extra Info Section */}
        <div className="mt-6 flex flex-col gap-2 text-sm text-gray-400 border-t border-gray-700 pt-4">
          <p>
            <span className="text-white">{user.userEmail}</span>
          </p>
          <p>
            📱 <span className="text-white">{user.userMobile || "Not added"}</span>
          </p>
          <p>
            <span className="text-white">{user.userWebsite || "No website"}</span>
          </p>
        </div>

        {/* Go to Notes Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/writenotes")}
            className="px-6 py-2 bg-sky-400 hover:bg-sky-500 text-black font-semibold rounded-full transition duration-200 shadow-md"
          >
            Go to Notes 📒
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
