import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaPlus,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaBoxOpen,
} from "react-icons/fa";
import Fade from "../components/Fade";

export default function UserDashboard({ user, setUser }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/user/getuser`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const Sidebar = () => (
    <>
      <div>
        <div className="flex items-center gap-3  mb-10">
          <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
            <FaUser />
          </div>

          <div
            className="cursor-pointer"
            onClick={() => navigate("/edituser")}
          >
            <h1 className="text-lg font-bold">
              {user?.username || "User"}
            </h1>
            <p className="text-xs text-gray-500">Dashboard</p>
          </div>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FaHome /> Home
          </button>

          <button
            onClick={() => navigate("/userposts")}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FaBox /> My Ads
          </button>

          <button
            onClick={() => navigate("/postitem")}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FaPlus /> Post Item
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FaBoxOpen /> My Orders
          </button>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 mt-auto text-red-500 hover:bg-red-50 p-3 rounded-lg transition"
      >
        <FaSignOutAlt /> Logout
      </button>
    </>
  );

  return (
    <Fade>
      <div className="flex min-h-screen  mt-32 md:mt-24">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setActive(true)}
          className="md:hidden  fixed -top-2 left-4 z-50  text-2xl cursor-pointer"
        >
          <FaBars />
        </button>

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-[300px] bg-white shadow-lg p-6 border-r">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar */}
        {active && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setActive(false)}
            />

            <aside className="fixed top-0 left-0 h-screen w-[280px] bg-white shadow-lg flex flex-col p-6 border-r z-50 md:hidden">
              <button
                onClick={() => setActive(false)}
                className="absolute top-4 right-4 text-xl"
              >
                <FaTimes />
              </button>

              <Sidebar />
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 relative flex flex-col p-4 md:p-8 space-y-6">
          <h1
            onClick={() => navigate("/edituser")}
            className="text-blue-500 absolute top-5 md:top-10 right-9 md:right-10 cursor-pointer"
          >
            Edit Profile
          </h1>

          {/* Profile Card */}
          <div className="bg-white w-full max-w-5xl mx-auto rounded-3xl flex flex-col items-center p-4 md:p-8 gap-3 shadow-sm">
            <img
              src={user?.dp}
              className="w-32 h-32 rounded-full object-cover border"
              alt="profile"
            />

            <h2 className="text-2xl font-bold">
              {user?.username || "Loading..."}
            </h2>

            <div className="flex flex-wrap justify-center gap-2 mt-2 mb-3 text-sm">
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                Role: {user?.role}
              </span>

              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full">
                {user?.isVerified ? "Verified" : "Not Verified"}
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8 text-center">
              <p className="text-gray-500">
                Email: {user?.email}
              </p>

              <p className="text-gray-500">
                Mobile No: {user?.phone}
              </p>

              <p className="text-gray-500">
                College: {user?.college}
              </p>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Joined{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toDateString()
                : "N/A"}
            </p>
          </div>
        </main>
      </div>
    </Fade>
  );
}