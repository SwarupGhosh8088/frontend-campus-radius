import React, { useState } from "react";
import axios from "axios";
import Fade from "../components/Fade";




export default function PostItem() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "electronics",
    pricePerMonth: "",
    sellingPrice: "",
    pickupLocation: "",
    images: [],
  });

  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    setForm((prev) => ({
      ...prev,
      images: files,
    }));

    // preview images
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  const validate = () => {
    if (!form.name.trim()) return "Item name is required";
    if (!form.description.trim()) return "Description is required";
    if (!form.pricePerMonth) return "Price per month is required";
    if (!form.sellingPrice) return "Selling price is required";
    if (!form.pickupLocation.trim()) return "Pickup location is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const error = validate();
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key !== "images") formData.append(key, value);
      });

      form.images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/item/postitem`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage({
        type: "success",
        text: res.data.message || "Item posted successfully 🎉",
      });

      // reset
      setForm({
        name: "",
        description: "",
        category: "electronics",
        pricePerMonth: "",
        sellingPrice: "",
        pickupLocation: "",
        images: [],
      });

      setPreview([]);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Server error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade>
    <div className="min-h-screen flex items-center mt-28 justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">
          Post Rental Item
        </h1>

       

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="w-full p-3 border rounded-xl"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 border rounded-xl"
          rows={4}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        >
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="books">Books</option>
          <option value="hostel essentials">Hostel Essentials</option>
          <option value="sports">Sports</option>
          <option value="mobile accessories">Mobile Accessories</option>
          <option value="decor items">Decor Items</option>
          <option value="other">Other</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="pricePerMonth"
            value={form.pricePerMonth}
            onChange={handleChange}
            placeholder="Price / Month"
            className="p-3 border rounded-xl"
          />

          <input
            name="sellingPrice"
            value={form.sellingPrice}
            onChange={handleChange}
            placeholder="Selling Price"
            className="p-3 border rounded-xl"
          />
        </div>

        <input
          name="pickupLocation"
          value={form.pickupLocation}
          onChange={handleChange}
          placeholder="Pickup Location"
          className="w-full p-3 border rounded-xl"
        />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          multiple
          onChange={handleImages}
          className="w-full p-2 border rounded-xl"
        />

        {/* PREVIEW */}
        {preview.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {preview.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="preview"
                className="w-20 h-20 object-cover rounded-lg border"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-50 p-3 rounded-xl text-white font-semibold transition ${
            loading
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Posting..." : "Post Item"}
        </button>
         {message && (
          <div
            className={`p-3 rounded-2xl text-center font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

      </form>
      
    </div>
    </Fade>
  );
}