import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Fade from "../components/Fade";

export default function Myposts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // FETCH MY POSTS 
  const fetchMyItems = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/item/useritem`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("MY POSTS:", res.data);

      setItems(res.data.data || []);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  //  DELETE POST 
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${import.meta.env.VITE_BACKEND_API}/item/deleteitem/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

   
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data || err.message);
    }
  };


  
  return (
    <Fade>
    <div className="min-h-screen mt-10 bg-gray-100 p-6 pt-24">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Posts</h1>

        <button
          onClick={() => navigate("/postitem")}
          className="bg-purple-600 text-white px-4 py-2 cursor-pointer rounded-lg hover:bg-purple-700 transition"
        >
          + Create Post
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-500">You haven't posted anything yet.</p>

          <button
            onClick={() => navigate("/postitem")}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Create Your First Post
          </button>
        </div>
      ) : (
        /* GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >

              {/* IMAGE */}
              <img
                src={item.images?.[0] || "https://via.placeholder.com/300"}
                className="w-full h-48 object-cover"
                alt={item.name}
              />

              {/* CONTENT */}
              <div className="p-4">

                <h2 className="text-lg font-semibold">
                  {item.name}
                </h2>

                <p className="text-sm text-gray-600 mt-1">
                  Rent: ₹ {Math.floor(item.pricePerMonth / 31)}/day
                </p>

                <p className="text-sm text-gray-600">
                  Sell: ₹ {item.sellingPrice}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {item.pickupLocation}
                </p>

                {/* ACTIONS */}
                <div className="flex justify-between items-center mt-4">

                  <button
                    onClick={() => navigate(`/updatepost/${item._id}`)}
                    className="flex items-center cursor-pointer gap-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <FaEdit /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center cursor-pointer gap-2 text-red-500 hover:text-red-700 text-sm"
                  >
                    <FaTrash /> Delete
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
    </Fade>
  );
}