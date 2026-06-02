import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Fade from "../components/Fade.jsx";


export default function EditUser() {
  const [form, setForm] = useState({
    username: "",
    college: "",
    phone: "",
  });

  const [user, setUser] = useState(null);
  const [dp, setDp] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/user/update`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = res.data.data;

        setUser(userData);

        setForm({
          username: userData.username || "",
          college: userData.college || "",
          phone: userData.phone || "",
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("username", form.username);
      data.append("college", form.college);
      data.append("phone", form.phone);

      if (dp) {
        data.append("dp", dp);
      }

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/user/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(res.data.message || "Profile updated successfully");

      setTimeout(() => {
        navigate("/user");
      }, 1200);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade>
    <div className="min-h-screen bg-gray-50 mt-20 md:mt-23  py-10 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Profile
          </h1>
          <p className="text-gray-500 mt-1">
            Update your account information and profile details.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-xl p-6"
        >
          
          {/* Profile Section */}
          <div className="flex items-center gap-5 pb-6 border-b border-gray-200">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center">
              {dp ? (
                <img
                  src={URL.createObjectURL(dp)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : user?.dp ? (
                <img
                  src={user.dp}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-gray-600">
                  {form.username?.charAt(0)?.toUpperCase() || "DP"}
                </span>
              )}
            </div>

            <div>
              <label className="cursor-pointer text-indigo-500 font-medium hover:text-blue-700">
                Change Photo
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setDp(e.target.files[0])}
                />
              </label>

              <p className="text-sm text-gray-500 mt-1">
                JPG, PNG or WEBP
              </p>

              {dp && (
                <p className="text-sm text-gray-700 mt-1">
                  {dp.name}
                </p>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-5 mt-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                College
              </label>

              <input
                type="text"
                name="college"
                value={form.college}
                onChange={handleChange}
                placeholder="Enter your college"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="mt-5 p-3 rounded-lg border border-green-200 bg-green-50">
              <p className="text-sm text-green-700">
                {message}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              type="button"
              onClick={() => navigate("/user")}
              className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
    </Fade>
  );
}