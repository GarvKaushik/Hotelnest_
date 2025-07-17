import React, { useState } from "react";
import { assets, facilityIcons } from "../assets/assets";
import { useNavigate, useSearchParams } from "react-router-dom";
import StarRating from "../Components/StarRating";
import { useAppContext } from "../context/Appcontext";
import { useMemo } from "react";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm ">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};
const Radiobutton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm ">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span>{label}</span>
    </label>
  );
};
const AllRooms = () => {
  const [searchparams, setsearchparams] = useSearchParams();
  const { rooms, navigate, currency } = useAppContext();

  const [openfilters, setopenfilters] = useState(false);
  const [selectedFilters, setselectedFilters] = useState({
    roomType: [],
    priceRange: [],
  });
  const [selectedSort, setSelectedSort] = useState("");
  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];
  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];
  // Handle changes for filter and sorting
  const handleFilterChange = (checked, value, type) => {
    setselectedFilters((prevFilters) => {
      const updatedfilters = { ...prevFilters };
      if (checked) {
        updatedfilters[type].push(value);
      } else {
        updatedfilters[type] = updatedfilters[type].filter(
          (item) => item !== value
        );
      }
      return updatedfilters;
    });
  };
  const HandlesortChange = (sortOptions) => {
    setSelectedSort(sortOptions);
  };
  // function to check if room matches room type
  const matchesroomType = (room) => {
    return (
      selectedFilters.roomType.length === 0 ||
      selectedFilters.roomType.includes(room.roomType)
    );
  };
  // function to match price filter
  const matchesPriceRange = (room) => {
    return (
      selectedFilters.priceRange.length === 0 ||
      selectedFilters.priceRange.some((range) => {
        const [min, max] = range.split("to").map(Number);
        return room.pricePerNight >= min && room.pricePerNight <= max;
      })
    );
  };
  // function to sort rooms based on sorting
  const sortrooms = (a, b) => {
    if (selectedSort === "Price Low to High") {
      return a.pricePerNight - b.pricePerNight;
    }
    if (selectedSort === "Price High to Low") {
      return b.pricePerNight - a.pricePerNight;
    }
    if (selectedSort === "Newest First") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  };
  // Filter Destinatiom

  const filterDestination = (room) => {
    const destination = searchparams.get("destination");
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  };
  // Filter and Sort rooms based on the selected filters and sort Options

  const filteredRooms = useMemo(() => {
    return rooms
      .filter(
        (room) =>
          matchesroomType(room) &&
          matchesPriceRange(room) &&
          filterDestination(room)
      )
      .sort(sortrooms);
  }, [rooms, selectedFilters, selectedSort, searchparams]);

  // clear all filters
  const clearFilters = () => {
    setselectedFilters({
      roomType: [],
      priceRange: [],
    });
    setSelectedSort("");
    setsearchparams({});
  };
  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
            Take advantage of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>
        {filteredRooms.map((room) => (
          <div
            key={room._id}
            className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
          >
            <img
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                scrollTo(0, 0);
              }}
              src={room.images[0]}
              alt=""
              title="View Room Details "
              className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
            />
            <div className="md:w-1/2 flex flex-col gap-2">
              <p className="text-gray-500">{room.hotel.city}</p>
              <p
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                className="text-gray-800"
              >
                {room.hotel.name}
              </p>
              <div className=" flex items-center">
                <StarRating />
                <p className="ml-2">200+ reviews</p>
              </div>
              <div>
                <img src={assets.locationIcon} alt="" />
                <span>{room.hotel.address}</span>
              </div>
              {/*room amenities*/}
              <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70"
                  >
                    <img src={facilityIcons[item]} className="w-5 h-5" alt="" />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>
              {/* rOOM pRICE FOR NIGHT */}
              <p className="text-xl font-medium text-gray-700">
                ${room.pricePerNight}/night
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Filter */}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 max:lg:mb-8 min-lg:mt-16">
        <div
          className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${
            openfilters && "border-b"
          }`}
        >
          <p className="text-base font-medium text-gray-800">FILTERS</p>
          <div className="text-xs cursor-pointer">
            <span
              onClick={() => setopenfilters(!openfilters)}
              className="lg:hidden"
            >
              {openfilters ? "HIDE" : "SHOW"}
            </span>
            <span className="hidden lg:block">CLEAR</span>
          </div>
        </div>
        <div
          className={`${
            openfilters ? "h-auto " : "h-0 lg:h-auto"
          } overflow-hidden transition-all duration-700`}
        >
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Popular Filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox
                key={index}
                label={room}
                selected={selectedFilters.roomType.includes(room)}
                onChange={(changed) => {
                  handleFilterChange(changed, room, "roomType");
                }}
              />
            ))}
          </div>
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Filters</p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={`${currency}${range}`}
                selected={selectedFilters.priceRange.includes(range)}
                onChange={(changed) => {
                  handleFilterChange(changed, range, "priceRange");
                }}
              />
            ))}
          </div>
          <div className="px-5 pt-5 pb-7">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortOptions.map((option, index) => (
              <Radiobutton
                key={index}
                label={option}
                onChange={(changed) => {
                  HandlesortChange(option);
                }}
              ></Radiobutton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
