import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Animate from "../components/Animate";





export default function RentalItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/item/itemdetails/${id}`
        );

        setItem(res.data.data);
      } catch (err) {
        console.log("Error fetching item:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleCall = () => {
    if (item?.owner?.phone) {
      window.location.href = `tel:${item.owner.phone}`;
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-500">
          Loading item details...
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Item not found</p>
      </div>
    );
  }

  return (
    <Animate>
      <div className="pt-24 px-4 mt-10 md:px-10 bg-gray-100 min-h-screen">



        <div className=" w-full bg-white    mx-auto p-3  flex-1  md:flex  rounded-2xl shadow-lg overflow-hidden">

          <div className=" md:w-[50%]  flex flex-col  p-3 ">

            {/* IMAGE */}
            <img
              src={item?.images?.[0] || "https://www.trschools.com/templates/imgs/20162309_100925_1.png"}
              alt={item.name}
              className="  rounded-2xl object-fill "
            />

            <div className=" pt-4 flex flex-col md:bg-mist-200 rounded-3xl p-3 mt-4  md:flex-row md:justify-between md:items-center">

              <div className="m-3  flex gap-3 p-1 items-center">

                <img className="h-12 w-12 border-2 border-mist-500 rounded-full" src={item?.owner?.dp} alt="Posted  By" />

                <div>
                  <p className="text-md">Posted by: <span className="text-blue-950 text:lg  font-semibold">{item?.owner?.username}</span></p>
                  <p className="text-sm">{item?.owner?.college}</p>
                  <p className="text-gray-600 text-sm">
                    Member since: {item?.owner?.createdAt?.split("T")[0]}
                  </p>

                </div>


              </div>

              {/* CALL BUTTON */}
              <button
                onClick={handleCall}
                className="mt-4 md:mt-0 cursor-pointer   bg-purple-500 border-2 shadow-2xl  hover:bg-purple-600 text-white px-6 py-3 rounded-3xl transition"
              >
                Call Owner
              </button>
            </div>

          </div>


          <div className="md:bg-gray-100  md:w-[50%] ml-4 rounded-2xl p-6 flex flex-col gap-6 shadow-sm">

            {/* TITLE + PRICE */}
            <div className="space-y-3">

              <h1 className="text-3xl font-bold text-gray-900">
                {item.name}
              </h1>

              <div className="flex flex-col gap-2">
                <p className="text-2xl text-gray-900">
                  Rent:
                  <span className="ml-2 text-xl font-semibold text-purple-900">
                    {item?.pricePerMonth === 0
                      ? "N/A"
                      : `₹ ${item.pricePerMonth} / month`}
                  </span>
                </p>

                <p className="text-2xl  text-gray-900">
                  Buy:
                  <span className="ml-2 text-xl font-semibold text-purple-900">
                    ₹ {item.sellingPrice}
                  </span>
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-mist-800 text-md">Posted on : {item.createdAt?.split("T")[0]}</p>
                <p className="bg-white border-2 border-green-500 p-2 rounded-3xl">{item?.availability?"Available":"Sold Out"}</p>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="border-t pt-4">
              <h3 className="text-md font-semibold text-gray-800 mb-2">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>


            {/* META */}
            <div className="mt-6 border-t border-gray-900 pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="bg-gray-50 rounded-xl border-2 border-red-500 p-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Pickup Location
                  </p>
                  <p className="text-gray-900 font-semibold mt-1">
                    {item.pickupLocation}
                  </p>
                </div>


                <div className="bg-gray-50 rounded-xl border-2 border- p-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Category
                  </p>
                  <p className="text-gray-900 font-semibold mt-1 capitalize">
                    {item.category}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl border-2 border-blue-500 p-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Condition
                  </p>
                  <p className="text-gray-900 font-semibold mt-1 capitalize">
                    {item.condition || "Not specified"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl border-2 border-amber-500 p-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Rating
                  </p>
                  <p className="text-yellow-500 font-semibold mt-1">
                    ⭐ {item.rating || "No ratings yet"}
                  </p>
                </div>

              </div>
            </div>








            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                More Images
              </h3>

              <div className="grid grid-cols-3 gap-2">
                {item.images?.slice(1).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${item.name}-${i}`}
                    className="w-full h-24 object-cover rounded-xl hover:scale-105 transition duration-200"
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </Animate>
  );
}