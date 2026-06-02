import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import Animate from "../components/Animate";






export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/user/register/`,
        formData
      );

      setMessage(res.data.message || "Registered Successfully");

      // 🔥 store email for OTP
      localStorage.setItem("email", formData.email);

      // redirect to OTP page
      navigate("/otpverify");

    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (

    <div className="min-h-screenz-50 z-51 fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center  ">
    <Animate>

      <div className=" w-80 md:w-90 relative flex flex-col justify-center items-center bg-white p-6 rounded-2xl shadow-lg">
        <h1 onClick={() => navigate("/")} className="absolute -top-1 -right-2 cursor-pointer bg-red-500 w-6 h-6 text-center  items-center rounded-full  text-sm  flex  justify-center">X</h1>

        <h2 className="text-2xl font-bold text-center mb-4">
          Register Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">

          {/* EMAIL */}
          <div className="relative w-70">
            <FaUser className="absolute top-3 left-3 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 pl-10 rounded-lg"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative w-70">
            <FaLock className="absolute top-3 left-3 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-2 pl-10 rounded-lg"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-50 cursor-pointer bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg"
          >
            Create Account
          </button>

          <button type="button">
            Already have an Account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer"
            >
              Log In
            </span>
          </button>

        </form>


        {message ? (
          <p className="mt-3 text-center text-sm text-blue-600">
            {message}
          </p>
        ) : (
          ""
        )}


      </div>
    </Animate>
    </div>
  );
}