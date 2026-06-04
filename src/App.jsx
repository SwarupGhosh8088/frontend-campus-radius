import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../pages/Navbar";
import Home from "../pages/Home";
import Register from "../pages/Register";
import OtpVerify from "../pages/OtpVerify";
import Login from "../pages/Login";
import User from "../pages/User";
import Postitem from "../pages/Postitem";
import Myposts from "../pages/Myposts";
import EditUser from "../pages/EditUser";
import ProtectedRoute from "../components/ProtectedRoute";
import RentalItemPage from "../pages/RentalItemPage";
import Pagesearch from "../pages/Pagesearch";
import Updatepost from "../pages/Updatepost";
import Notification from "../pages/Notification";



function App() {
  const [user, setUser] = useState(null);
  const [cllg, setCllg] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/user/getuser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <BrowserRouter>

     
      <Navbar
        user={user}
        setUser={setUser}
        cllg={cllg}
        setCllg={setCllg}
      />
     

      <Routes>

        <Route path="/" element={<Home cllg={cllg} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otpverify" element={<OtpVerify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rentalitem/:id" element={<RentalItemPage/>}/>
        <Route path="/pagesearch/:name" element={<Pagesearch/>}/> 
        <Route path="/pagesearch/cat/:category" element={<Pagesearch/>}/> 
        <Route path="/notify" element={<Notification/>}/> 

        <Route
          path="/user"
          element={
            <ProtectedRoute user={user}>
              <User user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/postitem"
          element={
            <ProtectedRoute  >
              <Postitem user={user} setUser={setUser}/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/updatepost/:id"
          element={
            <ProtectedRoute user={user}>
              <Updatepost/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/userposts"
          element={
            <ProtectedRoute user={user}>
              <Myposts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edituser"
          element={
            <ProtectedRoute user={user}>
              <EditUser />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;