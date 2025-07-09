import React from "react";
import Navbar from "./Components/navbar";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./Components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import HotelReg from "./Components/HotelReg";
import Layout from "./pages/Hotelowner/Layout";
import Dashboard from "./pages/Hotelowner/Dashboard";
import AddRoom from "./pages/Hotelowner/AddRoom";
import ListRoom from "./pages/Hotelowner/ListRoom";
import Testimonials from "./Components/Testimonials";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  return (
    <div>
      {!isOwnerPath && <Navbar />}
      {false && <HotelReg />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />}></Route>
          <Route path="/rooms/:id" element={<RoomDetails />}></Route>
          <Route path="/my-bookings" element={<MyBookings />}></Route>
          <Route path="/testimonials" element={<Testimonials />}></Route>
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path="add-room" element={<AddRoom />}></Route>
            <Route path="list-room" element={<ListRoom />}></Route>
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
