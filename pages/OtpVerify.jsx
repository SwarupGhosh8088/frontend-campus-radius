import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Animate from "../components/Animate";





export default function OtpVerify() {
  const navigate = useNavigate();

  // OTP entered by user
  const [otp, setOtp] = useState("");

  // Success or error message
  const [message, setMessage] = useState("");

  // Used for message color
  const [isError, setIsError] = useState(false);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // Email saved during registration
  const email = localStorage.getItem("email");

  // Verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      setIsError(true);
      setMessage("Email not found");
      return;
    }

    if (otp.length !== 4) {
      setIsError(true);
      setMessage("Please enter a valid 4-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/user/otpmatch",
        {
          email,
          otp,
        }
      );

      setIsError(false);
      setMessage(res.data.message || "OTP Verified Successfully");

      // Remove stored email after verification
      localStorage.removeItem("email");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setIsError(true);
      setMessage(
        error.response?.data?.message ||
          "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (!email) {
      setIsError(true);
      setMessage("Email not found");
      return;
    }

    try {
      setResending(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/user/otpresend`,
        {
          email,
        }
      );

      setIsError(false);
      setMessage(
        res.data.message || "New OTP sent successfully"
      );

    } catch (error) {
      setIsError(true);
      setMessage(
        error.response?.data?.message ||
          "Unable to resend OTP"
      );
    } 
  };

  return (
    <div className="fixed  inset-0 z-50 bg-black/10 backdrop-blur-md flex items-center justify-center">
      <Animate>
      <div className=" w-80 md:w-100 relative bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">

        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute cursor-pointer -top-1 -right-1 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">
          Verify Your Email
        </h2>

        <p className="text-purple-700 font-semibold">
          A 4 digit verification code has been sent to
        </p>

        <p className="text-sm text-gray-600 mt-1 mb-4">
          {email}
        </p>

        <p className="text-gray-500 text-sm mb-6">
          Please check your inbox and enter the code below.
          The verification code expires in{" "}
          <span className="font-bold">5 minutes</span>.
        </p>

        {/* OTP Form */}
        <form
          onSubmit={handleVerify}
          className="flex flex-col items-center gap-4 w-full"
        >
          <input
            type="text"
            maxLength={4}
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, ""))
            }
            placeholder="0000"
            className="w-52 h-12 border rounded-xl text-center text-xl tracking-[10px] focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-40 bg-green-600 text-white py-2 rounded-xl hover:bg-green-500 disabled:bg-gray-400"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Actions */}
        <div className="flex gap-8 mt-5 text-sm">

          <button
            onClick={handleResendOtp}
         
            className="text-blue-600 hover:underline"
          >
            Resend OTP
          </button>

          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            Change Email
          </button>

        </div>

        {/* Message */}
        {message && (
          <p
            className={`mt-5 text-sm font-medium ${
              isError
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
        </Animate>
    </div>
  );
}