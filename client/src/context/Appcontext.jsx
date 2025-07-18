import axios from "axios";
import { useContext, useRef } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isOwner, setisOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);
  const [rooms, setrooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms");
      if (data.success) {
        setrooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setisOwner(data.role === "hotelowner");

        setSearchedCities(data.recentSearchedCities);
      } else {
        //retry fetch user details in 5 secomds
        setTimeout(() => {
          fetchUser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);
  useEffect(() => {
    fetchRooms();
  }, []);
  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setisOwner,
    axios,
    showHotelReg,
    setShowHotelReg,
    setSearchedCities,
    searchedCities,
    rooms,
    setrooms,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
