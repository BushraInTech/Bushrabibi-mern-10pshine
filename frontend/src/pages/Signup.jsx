import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [profilePreviewImage, setProfilePreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return regex.test(password);
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!validatePassword(userPassword)) {
      toast.error(
        "Password must be at least 8 chars long, include 1 capital letter, 1 number, and 1 special character."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("userBio", userBio);
      formData.append("userEmail", userEmail);
      formData.append("userMobile", userMobile);
      formData.append("userName", userName);
      formData.append("userPassword", userPassword);
      formData.append("profileImage", profileImage);

      const result = await axios.post("http://localhost:6969/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Data:", result);
      toast.success("✅ User registered successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.log("Failed to Register User:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex w-full items-center justify-center bg-gray-100 p-5 min-h-screen">
      <ToastContainer position="top-right" autoClose={2000} />

      <form
        className="flex flex-col gap-3 bg-white p-6 rounded-xl shadow-xl w-full max-w-[450px]"
        onSubmit={registerUser}
      >
        <h1 className="text-2xl font-black text-center text-gray-700">Register</h1>

        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold">First Name</label>
            <input
              type="text"
              className="rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label className="font-semibold">Last Name</label>
            <input
              type="text"
              className="rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Bio</label>
          <textarea
            rows="2"
            className="rounded-md border p-2 focus:border-blue-500 focus:outline-none"
            placeholder="Tell us something about yourself"
            onChange={(e) => setUserBio(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Email</label>
          <input
            type="email"
            className="rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Mobile Number</label>
          <input
            type="number"
            className="rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setUserMobile(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Username</label>
          <input
            type="text"
            className="rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Password</label>
          <input
            type="password"
            className="rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Must be 8+ chars, include 1 capital letter, 1 number, and 1 special symbol.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="h-[120px] w-[120px] rounded-full overflow-hidden bg-gray-100 border border-gray-300">
            {profilePreviewImage ? (
              <img src={profilePreviewImage} alt="preview" className="h-full w-full object-cover" />
            ) : (
              <p className="flex h-full items-center justify-center text-gray-400 text-sm">
                No Image
              </p>
            )}
          </div>

          <label className="mt-2 cursor-pointer text-sm font-semibold text-blue-600 hover:underline">
            Upload Profile Image
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                setProfilePreviewImage(URL.createObjectURL(e.target.files[0]));
                setProfileImage(e.target.files[0]);
              }}
            />
          </label>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-600 transition-all"
        >
          Register
        </button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
