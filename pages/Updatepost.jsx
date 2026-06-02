import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Fade from "../components/Fade";



export default function Updatepost() {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/item/itemdetails/${id}`
      );

      const item = res.data.data;

      setForm({
        name: item.name || "",
        description: item.description || "",
        category: item.category || "electronics",
        pricePerMonth: item.pricePerMonth || "",
        sellingPrice: item.sellingPrice || "",
        pickupLocation: item.pickupLocation || "",
        images: [],
      });

      setPreview(item.images || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    setForm({
      ...form,
      images: files,
    });

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreview(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("pricePerMonth", form.pricePerMonth);
      formData.append("sellingPrice", form.sellingPrice);
      formData.append("pickupLocation", form.pickupLocation);

      form.images.forEach((image) => {
        formData.append("images", image);
      });

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_API}/item/updateitem/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/userposts");
      }, 1500);

    } catch (err) {
      console.log(err.response?.data);

      setMessage(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-24 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl space-y-4"
        >
          <h1 className="text-3xl font-bold text-center">
            Update Rental Item
          </h1>

          {message && (
            <div className="bg-blue-100 text-blue-700 p-3 rounded">
              {message}
            </div>
          )}

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Item Name"
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            className="w-full border p-3 rounded-xl"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          >
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="books">Books</option>
            <option value="sports">Sports</option>
            <option value="other">Other</option>
          </select>

          <input
            type="number"
            name="pricePerMonth"
            value={form.pricePerMonth}
            onChange={handleChange}
            placeholder="Price Per Month"
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="number"
            name="sellingPrice"
            value={form.sellingPrice}
            onChange={handleChange}
            placeholder="Selling Price"
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="pickupLocation"
            value={form.pickupLocation}
            onChange={handleChange}
            placeholder="Pickup Location"
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="file"
            multiple
            onChange={handleImages}
            className="w-full border p-2 rounded-xl"
          />

          <div className="flex flex-wrap gap-2">
            {preview.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="preview"
                className="w-20 h-20 rounded-lg object-cover"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-xl"
          >
            {loading ? "Updating..." : "Update Item"}
          </button>
        </form>
      </div>
    </Fade>
  );
}