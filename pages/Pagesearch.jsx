import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import Fade from "../components/Fade";





export default function Pagesearch() {
  const { name, category } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);

        const url = name
          ? `${import.meta.env.VITE_BACKEND_API}/item/itembyname/${name}`
          : `${import.meta.env.VITE_BACKEND_API}/item/itembycat/${category}`;

        const res = await axios.get(url);

        setItems(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [name, category]);

  return (
    <Fade>
      <div className="min-h-screen mt-20 bg-slate-100">
        {/* Hero */}


        <div className="max-w-7xl mx-auto px-4 py-8">
          {loading ? (
            <p className="text-center mt-10 text-xl font-semibold">
              Loading...
            </p>
          ) : items.length === 0 ? (
            <h1 className="text-xl  font-sans rounded-2xl p-3 mb-6">

              Showing <span className="font-semibold text-2xl">{items.length}</span>  results for <span className="font-semibold text-2xl">{name || category}</span>

            </h1>
          ) : (
            <div className="h-full rounded-2xl bg-mist-100 w-full flex flex-col p-3">


              <h1 className="text-xl  font-sans rounded-2xl p-3 mb-6">

                Showing <span className="font-semibold text-2xl">{items.length}</span>  results for <span className="font-semibold text-2xl">{name || category}</span>

              </h1>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {items.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => navigate(`/rentalitem/${item._id}`)}
                    className="bg-white rounded-xl cursor-pointer hover:bg-gray-200 shadow-md overflow-hidden transition"
                  >
                    {/* Main Image */}
                    <img
                      src={item.images?.[0] || "https://via.placeholder.com/300"}
                      className="w-full h-50 rounded-xl object-cover"
                      alt={item.name}
                    />

                    {/* Thumbnails */}
                    <div className="flex gap-2 h-10 justify-center p-2">
                      {item.images?.slice(0, 3).map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          className="w-10 h-10 object-cover rounded border"
                          alt="thumb"
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                      <div className="flex flex-col p-2">
                        <p className="text-md font-semibold">
                          {item.name}
                        </p>

                        <p className="text-lg text-black">
                          Rent: ₹ {(item.pricePerMonth / 30).toFixed(2)}/day
                        </p>

                        <p className="text-lg text-gray-600">
                          Buy: ₹ {item.sellingPrice}
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-3">
                        <p className="text-xs text-gray-700">
                          {item.pickupLocation}
                        </p>

                        <span className="text-gray-700 text-xs font-semibold">
                          {formatDistanceToNow(
                            new Date(item.updatedAt),
                            { addSuffix: true }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fade>
  );
}