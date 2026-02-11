import axios from "axios";
import React, { useState } from "react";
import { setUserData } from "../Redux/slices/user-slice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      if (!userEmail || !userPassword) {
        toast.warn("Please enter both email and password!");
        return;
      }

      const user = { userEmail, userPassword };
      const result = await axios.post("http://localhost:6969/auth/login", user);

      if (result.data.status === "Error") {
        toast.error("❌ Wrong email or password!");
      } else {
        toast.success("✅ Logged in successfully!");
        dispatch(setUserData(result.data));
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Server error, please try again later!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <ToastContainer position="top-right" autoClose={2000} />
      <form
        className="flex w-full max-w-[420px] flex-col gap-5 rounded-xl bg-white p-6 shadow-lg"
        onSubmit={loginUser}
      >
        <h1 className="text-2xl font-bold text-center text-gray-700">Login</h1>

        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="userEmail">
            Email
          </label>
          <input
            type="email"
            id="userEmail"
            className="w-full rounded-lg border border-gray-300 p-2 mt-1 focus:ring focus:ring-blue-500"
            placeholder="your.email@example.com"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="userPassword">
            Password
          </label>
          <input
            type="password"
            id="userPassword"
            className="w-full rounded-lg border border-gray-300 p-2 mt-1 focus:ring focus:ring-blue-500"
            placeholder="*********"
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <div className="text-right text-sm mt-1">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          className="rounded-lg bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-600 transition-all"
          type="submit"
        >
          Log In
        </button>

        <div className="text-center text-sm">
          New to FindMyNotes?{" "}
          <Link to="/signup" className="font-bold text-blue-500 hover:underline">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
