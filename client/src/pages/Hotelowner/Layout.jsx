import React, { useEffect } from "react";
import Navbar from "../../Components/HotelOwner/Navbar";
import Sidebar from "../../Components/HotelOwner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/Appcontext";
const Layout = () => {
  const { isOwner, navigate } = useAppContext();

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner]);
  return (
    <div className="flex flex-col h-screen">
      {" "}
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 p-4 pt-10 md:px-10 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
