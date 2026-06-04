import React from 'react';
import { useState, useEffect } from 'react';
import { FaBell, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoColorPalette, IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import colleges from "../files/collages.json";
import logo from "../src/assets/logo.png"
import { FaBars } from 'react-icons/fa';


const Navbar = ({ user, setUser, cllg, setCllg }) => {
    const navigate = useNavigate();


    const handleUserRoute = () => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/user");
        } else {
            navigate("/register");

        }
    };




    const [showModal, setShowModal] = useState(false);




    //  Logout
    const handleLogout = () => {
        localStorage.removeItem("token");

        navigate("/");
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) return;

                const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/user/getuser`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            
                setUser(res.data.data);
                setCllg(res.data.data.college);
            } catch (err) {
                console.log("Error fetching user:", err);
            }
        };

        fetchUser();
    }, [localStorage.getItem("token")]);

    const [search, setSearch] = useState(null)


    return (
        <div className=' fixed top-0 left-0 right-0 flex flex-col     justify-around bg-white z-50 h-15 md:h-27 md:shadow'>


            <div className=' hidden md:flex relative justify-around  items-center'>


                {/* logo */}
                <div className='  md:flex  cursor-pointer items-center justify-center ' onClick={() => navigate("/")}>
                    <img className='h-20 hidden md:block ' src={logo} alt="" />
                    <h1 className=' text-xl md:text-3xl font-semibold  cursor-pointer'>Campus<span className='text-purple-700'>Radius</span></h1>

                </div>


                {/* college*/}

                <div
                    onClick={() => setShowModal(true)}
                    className="hidden md:flex items-center gap-2  w-40 md:w-50 h-10 md:h-13 border border-mist-200 shadow p-3 rounded-xl cursor-pointer"
                >
                    <IoLocationSharp className="text-purple-700 text-2xl" />

                    <input
                        value={user?.college || cllg ||"Select Colleges"}
                        readOnly
                        className="w-full outline-none bg-transparent cursor-pointer"
                    />
                </div>


                <IoLocationSharp onClick={() => setShowModal(true)} className="  md:hidden text-purple-700  cursor-pointer text-2xl" />


                {/* searchbar */}
                <div className=" flex items-center h-8 md:h-12 bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">

                    <input
                        type="text"
                        placeholder="Search books, electronics..."
                        className=" w-25  md:w-55 px-5 py-3 outline-none text-gray-700 placeholder:text-gray-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button
                        onClick={() => navigate(`/pagesearch/${search}`)}
                        className="bg-purple-600  w-7 md:w-15 h-12 cursor-pointer  hover:bg-purple-700 text-white md:px-5 md:py-3 transition-all duration-300"
                    >
                        <FaSearch className='w-7' />
                    </button>

                </div>
                <div className='flex gap-12 items-center'>

                    {/* notification */}

                    <div onClick={()=>navigate("/notify")} className='relative hidden  md:flex flex-col'>
                        <h1 className=' bg-red-700 absolute w-5  h-5 -top-4 left-3 text-white rounded-4xl text-center'>1</h1>
                        <FaBell className="text-2xl  hover:text-purple-700 cursor-pointer"></FaBell>

                    </div>


                    {/* cart */}
                    <div className="hidden md:flex  flex-col">
                        {user ? (
                            <button
                                onClick={() => navigate("/postitem")}
                                className="px-5 py-2 bg-purple-500 cursor-pointer text-white rounded-3xl hover:bg-purple-400 transition"
                            >
                                Post Item
                            </button>
                        ) : (
                            <p className='cursor-pointer  font-semibold text-indigo-400 text-md' onClick={() => handleUserRoute()}>Login/Signup</p>
                        )}
                    </div>

                    {/* account */}
                    <div>

                        {
                            user ? (

                                <div className="flex border-2 border-mist-400 rounded-full items-center ">

                                    <img
                                        src={user?.dp}
                                        alt="dp"
                                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                                        onClick={() => handleUserRoute()}
                                    />



                                </div>

                            ) : (

                                <FaUserCircle className="text-3xl  hover:text-purple-700  cursor-pointer
                                "onClick={() => handleUserRoute()}></FaUserCircle>

                            )
                        }

                    </div>







                </div>

            </div>



            {/* mobile responsive */}


            <div className='md:hidden mt-1 '>
                <div className='md:hidden  flex justify-between p-2'>


                    <div className='flex  items-center justify-around gap-6'>

                        <FaBars className='cursor-pointer' onClick={()=>setShowModal(true)}></FaBars>
                        <h1 onClick={()=>navigate("/")} className=' text-xl md:text-3xl font-semibold  cursor-pointer'>Campus<span className='text-purple-900'>Radius</span></h1>
                        <IoLocationSharp onClick={() => setShowModal(true)} className="  md:hidden text-purple-800  cursor-pointer text-2xl" />


                    </div>

                    <div className='flex items-center gap-4 justify-around'>


                        <div onClick={()=>navigate("/notify")} className='relative  md:flex flex-col'>
                            <h1 className=' bg-red-700 absolute w-4 h-4 -top-3 left-4 items-center  text-white rounded-4xl text-center'>1</h1>
                            <FaBell className="text-2xl  hover:text-purple-700 cursor-pointer"></FaBell>

                        </div>


                        <div>

                            {
                                user ? (
                                    <div className="flex border-2 border-mist-400 rounded-full items-center ">
                                        <img
                                            src={user?.dp}
                                            alt="dp"
                                            className="w-7 h-7 rounded-full object-cover cursor-pointer"
                                            onClick={() => handleUserRoute()}
                                        />
                                    </div>
                                ) : (
                                    <FaUserCircle className="text-3xl  hover:text-purple-700  cursor-pointer
                                "onClick={() => handleUserRoute()}></FaUserCircle>
                                )
                            }
                        </div>



                    </div>

                </div>



                <div className="relative  ml-2 mr-2 flex items-center h-12 mt-2 bg-white rounded-3xl shadow-md overflow-hidden border border-gray-200">

                    <input
                        type="text"
                        placeholder="Search books, electronics..."
                        className=" w-full  px-5 py-3 outline-none text-gray-700 placeholder:text-gray-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button
                        onClick={() => navigate(`/pagesearch/${search}`)}
                        className="bg-purple-700  w-12 h-12 cursor-pointer rounded-full  items-center  hover:bg-purple-800 text-white px-3 py-3 transition-all duration-300"
                    >
                        <FaSearch className='text-xl text-center  rounded-full' />
                    </button>

                </div>






            </div>




















            <div className='hidden md:flex justify-end gap-14 mr-5'>

                <div onClick={() => window.open("https://www.linkedin.com/in/swarupghosh726/", "_blank")}
                    className='hover:text-purple-500 font-medium cursor-pointer '><h1>Join Us</h1></div>
                <div onClick={() => window.open("https://www.linkedin.com/in/swarupghosh726/", "_blank")}
                    className='hover:text-purple-500 font-medium cursor-pointer '><h1>Contact Us</h1></div>

            </div>











            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/40 flex">

                    {/* LEFT PANEL */}
                    <div className="w-[450px] bg-white h-screen p-8 overflow-y-auto">

                        {/* HEADER */}
                        <div className="flex items-center justify-between mb-10">


                            <h1 className="text-2xl font-bold">
                                {cllg}
                            </h1>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-2xl  bg-red-500 w-8 mb-3 pb-1 rounded-full cursor-pointer"
                            >
                                x
                            </button>




                        </div>

                        {/* COLLEGE LIST */}
                        <div className="grid grid-cols-1 gap-4">

                            {colleges.map((college, index) => (

                                <div
                                    key={index}
                                    className="cursor-pointer p-4 border rounded-xl hover:bg-gray-100 transition"
                                    onClick={() => {
                                        setCllg(college.name)
                                        console.log(college.name);
                                        setShowModal(false);

                                    }}
                                >

                                    <h2 className="text-md font-semibold">
                                        {college.name}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {college.city}, {college.state}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>
            )}





        </div>
    );
};

export default Navbar;