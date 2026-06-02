import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import googleimg from "../src/assets/google.png"
import Animate from "../components/Animate";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/user/login`,
        formData
      );

      // save token (VERY IMPORTANT)
      localStorage.setItem("token", res.data.data.token);

      setMessage(res.data.message);

      // redirect after login
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screenz-50 z-51 fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center  ">
      <Animate>
      <div className="  w-80 md:w-90  relative h-100 flex flex-col gap-3 bg-white p-6 rounded-2xl shadow-lg">
        <h1 onClick={()=>navigate("/")} className="absolute -top-1 left-75 md:left-85 cursor-pointer bg-red-500 w-6 h-6 text-center  items-center rounded-full  text-sm  flex  justify-center">X</h1>

        <h2 className="text-2xl font-bold text-center mb-4">
          Log In to Your Account
        </h2>

        <form  onSubmit={handleSubmit} className="space-y-4 flex  flex-col justify-center items-center">

          {/* email */}
          <FaUser className="absolute top-24 left-1 md:left-4"></FaUser>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-70 border p-2  rounded-lg"
          />

          {/* password */}
          <FaLock className="absolute top-39 left-1 md:left-4"></FaLock>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-70 border   p-2 rounded-lg"
          />

          {/* button */}
          <button
            type="submit"
            className="w-50 font-bold bg-purple-700 text-white py-2 rounded-2xl cursor-pointer hover:bg-purple-600"
          >
            LOG IN
          </button>
          <p>Don't have an account? <span onClick={()=>navigate("/register")} className="text-blue-500 cursor-pointer">Register Yourself</span></p>

          <div className="flex  items-center gap-4 justify-center border rounded-2xl p-1 cursor-pointer hover:bg-gray-100 w-70">
            <img className="h-8" src={googleimg} alt="login with google" />
            <p>Log In with Google</p>
          </div>


        </form>

        {/* message */}
        {message && (
          <p className="mt-3 text-center text-sm text-blue-600">
            {message}
          </p>
        )}

      </div>

      </Animate>
    </div>
  );
}