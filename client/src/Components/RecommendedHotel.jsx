import React, { useEffect, useState } from "react";

import HotelCards from "./HotelCards";
import Title from "./Title";

import { useAppContext } from "../context/Appcontext";
const RecommendedHotels = () => {
  const { rooms, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filterHotels = () => {
    const safeSearchedCities = Array.isArray(searchedCities)
      ? searchedCities
      : [];

    const filteredHotels = rooms
      .slice()
      .filter((room) => safeSearchedCities.includes(room.hotel.city));
    setRecommended(filteredHotels);
  };
  useEffect(() => {
    filterHotels();
  }, [rooms, searchedCities]);
  return (
    recommended.length > 0 && (
      <div className=" flex flex-col items-center px-6 md:px-15 lg:px-13 bg-slate-50 py-20">
        <Title
          title={`Recommended Hotels`}
          subtitle={
            "Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
          }
        />
        <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
          {recommended.slice(0, 4).map((room, index) => (
            <HotelCards key={room._id} room={room} index={index} />
          ))}
        </div>
      </div>
    )
  );
};

export default RecommendedHotels;
