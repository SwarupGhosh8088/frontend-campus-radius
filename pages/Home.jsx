import React, { useState, useEffect } from "react";
import axios from "axios";
import categories from "../files/suggestion.js";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import dash1 from "../src/assets/dash1.jpeg";
import dash2 from "../src/assets/dash2.png";
import dash3 from "../src/assets/dash3.jpeg";
import Fade from "../components/Fade.jsx";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";




const Home = ({ user, cllg, setCllg }) => {
    const images = [dash1, dash2, dash3, dash2];
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);

    const fetchItems = async () => {
        try {
            let res;
            if (cllg === "All Colleges") {
                res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_API}/item/`
                );

            }
            else if (cllg) {
                res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_API}/item/itembycollege/${cllg}`
                );
            } else {
                res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_API}/item/`
                );
            }

            setItems(res.data.data || res.data.allItems || []);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [cllg]);

    // IMAGE SLIDER
    useEffect(() => {
        const interval = setInterval((prev) => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [cllg]);




    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);

    };

    return (
        <Fade>
            <div className="w-full min-h-screen bg-white flex flex-col gap-10 p-3 mt-15 md:mt-28">





                {/* CATEGORIES */}

                <div className="hidden md:flex  border border-gray-300  shadow-2xl shadow-indigo-300 justify-center gap-6 bg-white p-3 rounded-xl">
                    {categories.map((item, index) => (
                        <div key={index}

                            onClick={() => navigate(`/pagesearch/cat/${item.category.split(" ")[0]}`)}
                            className="flex  p-1 h-45 text-center shadow border border-gray-200 bg-indigo-200  rounded-2xl cursor-pointer hover:scale-110 transition duration-300 flex-col items-center">
                            <img
                                src={item.image}
                                className=" h-34  object-cover rounded-xl"
                                alt={item.category}
                            />
                            <p className="mt-2 text-sm font-sans capitalize">
                                {item.category}
                            </p>
                        </div>
                    ))}
                </div>


                <div className=" md:hidden flex flex-wrap items-center mt-13 justify-center bg-white border border-mist-300 shadow-2xl shadow-purple-300 rounded-2xl p-3  gap-2  ">
                    {
                        categories.map((item,index)=>(
                            <div key={index}
                             onClick={() => navigate(`/pagesearch/cat/${item.category.split(" ")[0]}`)}
                             className=" flex flex-col  items-center  border border-mist-400 rounded-2xl p-2 ">
                                <img src={item.image} className="h-10  object-cover  w-8" alt="" />

                                <p className=" text-center text-sm ">{item.category.split(" ")[0]}</p>


                            </div>
                        ))
                    }
                </div>






                {/* DASHBOARD */}
                <div className="flex w-full justify-center">
                    <div className="w-full max-w-6xl h-40 md:h-120  rounded-2xl shadow-lg overflow-hidden">

                        <img
                            src={images[current]}
                            alt="dashboard"
                            className="w-full h-full object-cover transition-all duration-700"
                        />

                    </div>
                </div>



                {/* LOADING */}
                {loading ? (
                    <p className="text-center mt-10">Loading...</p>
                ) : (

                    <div className=" hidden h-full rounded-2xl bg-white shadow-2xl shadow-indigo-300 md:border border-mist-300 w-full md:flex flex-col p-3 ">


                        <h1 className="text-3xl font-semibold rounded-2xl p-3 text-center mb-6">
                            {cllg ? "Your College Posts" : "All Posts"}
                        </h1>


                        {/* CARDS */}
                        <div className="md:grid flex flex-col items-center cursor-pointer hover md:grid-cols-4 gap-10 ">

                            {items.map((item) => (
                                <div
                                    key={item._id}
                                    onClick={() => navigate(`/rentalitem/${item._id}`)}
                                    className="bg-white border  border-mist-300 w-65 flex flex-col justify-center rounded-xl realtive cursor-pointer hover:bg-gray-50 shadow-md overflow-hidden  "
                                >

                                    {/* main image */}
                                    <div className="w-full border  border-mist-400 h-44 bg-white rounded-xl overflow-hidden relative">

                                        <img
                                            src={item.images?.[0] || "https://www.trschools.com/templates/imgs/20162309_100925_1.png"}
                                            className="w-full h-full object-contain transition duration-300 hover:scale-105 hover:blur-[0.5px]"
                                            alt={item.name}
                                        />

                                    </div>

                                    {/* thumbnails */}
                                    {/*                                     <div className="flex gap-2  h-10  justify-center p-2">

                                        {item.images?.slice(0, 3).map((img, i) => (
                                            <img
                                                key={i}
                                                src={img}
                                                className="w-10 h-10 object-cover rounded border"
                                                alt="thumb"
                                            />
                                        ))}
                                    </div>
                                    */}


                                    {/* content */}
                                    <div className=" flex flex-col ">



                                        {/* price */}
                                        <div className="flex flex-col p-1 ml-2   ">

                                            <p className=" text-lg font-semibold">
                                                {item.name}
                                            </p>

                                            <p className="text-sm  text-black">
                                                Rent it: ₹ {(item.pricePerMonth / 30).toFixed(2)}/day
                                            </p>

                                            <p className="text-sm font text-grey-500 ">
                                                Buy: ₹ {item.sellingPrice}
                                            </p>



                                        </div>

                                        <div className="flex items-center justify-between   p-3">

                                            <p className="text-xs text-gray-700 mt-1">
                                                {item.
                                                    pickupLocation
                                                }
                                            </p>
                                            <span className="text-gray-700 text-xs font-semibold">
                                                {
                                                    formatDistanceToNow(
                                                        new Date(item.updatedAt),
                                                        { addSuffix: true },

                                                    )
                                                }
                                            </span>


                                        </div>


                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {/* mobile responisve */}


                 {/* LOADING */}
                {loading ? (
                    <p className=" md:hidden text-center mt-10">Loading...</p>
                ) : (

                    <div className=" md:hidden bg-gray-100 h-full rounded-2xl p-3 ">


                        <h1 className="text-xl font-semibold rounded-2xl p-3  mb-6">
                            {cllg ? "Your College Posts" : "All Posts"}
                        </h1>


                        {/* CARDS */}
                        <div className="grid  items-center cursor-pointer hover grid-cols-2  gap-2">

                            {items.map((item) => (
                                <div
                                    key={item._id}
                                    onClick={() => navigate(`/rentalitem/${item._id}`)}
                                    className="bg-white border  border-mist-300 w-37 flex flex-col justify-center rounded-xl realtive cursor-pointer hover:bg-gray-50 shadow-md overflow-hidden  "
                                >

                                    {/* main image */}
                                    <div className="w-37 border  border-mist-400 h-30   bg-white rounded-xl   relative">

                                        <img
                                            src={item.images?.[0] || "https://www.trschools.com/templates/imgs/20162309_100925_1.png"}
                                            className="w-full h-full rounded object-cover transition duration-300 hover:scale-105 hover:blur-[0.5px]"
                                            alt={item.name}
                                        />

                                    </div>

                                    {/* thumbnails */}
                                    {/*                                     <div className="flex gap-2  h-10  justify-center p-2">

                                        {item.images?.slice(0, 3).map((img, i) => (
                                            <img
                                                key={i}
                                                src={img}
                                                className="w-10 h-10 object-cover rounded border"
                                                alt="thumb"
                                            />
                                        ))}
                                    </div>
                                    */}


                                    {/* content */}
                                    <div className=" flex flex-col  ">



                                        {/* price */}
                                        <div className="flex flex-col p-1 ml-2   ">

                                            <p className=" text-sm font-semibold">
                                                {item.name}
                                            </p>

                                            <p className="text-sm  text-black">
                                                Rent it: ₹ {(item.pricePerMonth / 30).toFixed(2)}/day
                                            </p>

                                              <p className="text-sm font text-grey-500 ">
                                                Buy: ₹ {item.sellingPrice}
                                            </p>



                                        </div>

                                        <div className="flex flex-col  ml-2 justify-between m-1">

                                            <p className="text-xs text-gray-700 mt-1">
                                                {item.
                                                    pickupLocation
                                                }
                                            </p>
                                            <span className="text-gray-700 text-xs font-semibold">
                                                {
                                                    formatDistanceToNow(
                                                        new Date(item.updatedAt),
                                                        { addSuffix: true },

                                                    )
                                                }
                                            </span>


                                        </div>


                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


            </div >
        </Fade>
    );
};

export default Home;