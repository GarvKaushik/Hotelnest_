import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";
import StarRating from "../Components/StarRating";
import { useAppContext } from "../context/Appcontext";
import toast from "react-hot-toast";

const RoomDetails = () => {
  const { id } = useParams();
  const { rooms, getToken, axios, navigate } = useAppContext();
  const [room, setroom] = useState(null);
  const [mainimage, setmainimage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setguests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  // check if room is available
  const checkAvailability = async () => {
    try {
      // check in checkin checkout date
      if (checkInDate >= checkOutDate) {
        toast.error("Check in Date should be less than check out Date");
        return;
      }
      const { data } = await axios.post("/api/bookings/check-availability", {
        room: id,
        checkInDate,
        checkOutDate,
      });
      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success("Room is Available");
        } else {
          setIsAvailable(false);
          toast.error("Room is not Available");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // onsubmit Handler function to check avaialbility &book the room

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!isAvailable) {
        return checkAvailability();
      } else {
        const { data } = await axios.post(
          "api/bookings/book",
          {
            room: id,
            checkInDate,
            checkOutDate,
            guests,
            paymentMethod: "Pay at Hotel",
          },
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          }
        );
        if (data.success) {
          toast.success(data.message);
          navigate("/my-bookings");
          scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    const room = rooms.find((room) => room._id === id);
    room && setroom(room);
    room && setmainimage(room.images[0]);
  }, [rooms]);
  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}
            <span className="font-inter text-sm"> ({room.roomType})</span>
          </h1>
          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>
        {/* Room Rating */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating />
          <p className="ml-2">200+ reviews</p>
        </div>
        {/* Room Address */}
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="" />
          <span>{room.hotel.address}</span>
        </div>

        {/* Room Images */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainimage}
              className="w-full rounded-xl shadow-lg object-cover"
              alt=""
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                    mainimage === image && "outline-3 outline-orange-500"
                  }`}
                  onClick={() => setmainimage(image)}
                  key={index}
                  src={image}
                  alt=""
                />
              ))}
          </div>
        </div>
        {/* room highlight */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  className="flex
              items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                  key={index}
                >
                  <img src={facilityIcons[item]} alt="" />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          {/** room price */}
          <p className="text-2xl font-medium">${room.pricePerNight}/night</p>
        </div>
        {/**checkin checkout */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl"
        >
          <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
            <div className="flex flex-col">
              <label htmlFor="checkindate" className="font-medium">
                Check-In
              </label>
              <input
                onChange={(e) => setCheckInDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                type="date"
                id="checkindate"
                placeholder="Check-In"
                className="w-full rounded border border-gray-300 px-3 py-2 
              mt-1.5 outline-none 
              "
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="checkoutdate" className="font-medium">
                Check-Out
              </label>
              <input
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate}
                disabled={!checkInDate}
                type="date"
                id="checkoutdate"
                placeholder="Check-Out"
                className="w-full rounded border border-gray-300 px-3 py-2 
              mt-1.5 outline-none 
              "
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                Guests
              </label>
              <input
                onChange={(e) => setguests(e.target.value)}
                value={guests}
                type="number"
                id="guests"
                placeholder="1"
                className="max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5
              "
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className=" bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer "
          >
            {isAvailable ? "Book Now" : "Check Availability"}
          </button>
        </form>

        {/**Common Specifications */}
        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec, index) => (
            <div className="flex items-start gap-2" key={index}>
              <img src={spec.icon} alt="" className="w-6.5" />
              <div>
                <p className="text-base">{spec.title}</p>
                <p className="text-gray-500">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
          <p>
            Guests will be allocated on the ground floor according to
            Availability. You get a comfortable two bedroom apartment which has
            a true city feeling. The price quoted is for one guest, at the guest
            slot please mark the number of guests to get the exact price for
            groups.
          </p>
        </div>
        {/* Hosted By */}

        <div className="flex flex-col items-start gap-4">
          <div className="flex gap-4">
            <img
              src={room.hotel.owner.image}
              alt=""
              className="h-14 w-14 md:h-18 md:w-18 rounded-full"
            />
            <div>
              <p className="text-lg md:text-xl">Hosted By:{room.hotel.name}</p>
              <div className="flex items-center mt-1">
                <StarRating />
                <p className="ml-2">200+ reviews</p>
              </div>
            </div>
          </div>
          <button className="px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer">
            Contact Me
          </button>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
