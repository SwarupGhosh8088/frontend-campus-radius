import React, { useState ,useEffect } from "react";
import axios from "axios";
import Fade from "../components/Fade";




export default function PostItem({user,setUser}) {
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
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Handle input
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

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };


  const validate = () => {
    if (!form.name.trim()) return "Item name is required";
    if (!form.description.trim()) return "Description is required";
    if (!form.pricePerMonth) return "Price per month is required";
    if (!form.sellingPrice) return "Selling price is required";
    if (!form.pickupLocation.trim()) return "Pickup location is required";

    if (!user?.phone) return "Please update your phone number first";

    return null;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

 
    if (!user?.phone) {
      setMessage({
        type: "error",
        text: "Please update your phone number before posting an item",
      });
      return;
    }

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
          },
        }
      );

      setMessage({
        type: "success",
        text: res.data.message || "Item posted successfully",
      });

      // reset form
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

  const isBlocked = loading || !user?.phone;


  return (
    <Fade>
      <div className="min-h-screen flex items-center mt-28 justify-center bg-gray-100 p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full  bg-white p-8 rounded-2xl shadow-lg space-y-4"
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
            <option value="Mobile Accessories">Mobile Accessories</option>
            <option value="Decor Items">Decor Items</option>
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
            disabled={isBlocked}
            className={`   p-3 rounded-xl text-white font-semibold transition ${
              isBlocked
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading
              ? "Posting..."
              : !user?.phone
              ? "Update phone first"
              : "Post Item"}
          </button>





          {message && (
            <div
              className={`p-3 rounded-2xl text-center ml-28  mr-28 font-medium ${message.type === "success"
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