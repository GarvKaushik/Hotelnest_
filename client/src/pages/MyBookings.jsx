import React, { useState } from "react";
import Title from "../Components/Title";
import { assets, userBookingsDummyData, userDummyData } from "../assets/assets";
const MyBookings = () => {
  const [bookings, setbookings] = useState(userBookingsDummyData);
  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Bookings"
        subtitle="Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks"
        align="left"
      />
      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div className=" hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div className="w-1/3">Hotels</div>
          <div className="w-1/3">Date and Timings</div>
          <div className="w-1/3">Payment</div>
        </div>
        {bookings.map((booking) => (
          <div
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t "
            key={booking._id}
          >
            {/* //Hotel Details */}
            <div className="flex flex-col md:flex-row">
              <img
                src={booking.room.images[0]}
                alt=""
                className="min-md:w-44 rounded shadow object-cover"
              />
              <div className=" flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
                <p className="font-playfair text-2xl">
                  {booking.hotel.name}
                  <span className="font-inter text-sm">
                    {" "}
                    ({booking.room.roomType})
                  </span>
                </p>
                <div className="flex items-centergap-1 text-sm text-gray-500">
                  <img src={assets.locationIcon} alt="" className="" />
                  <span>{booking.hotel.address}</span>
                </div>
                <div className="flex items-centergap-1 text-sm text-gray-500">
                  <img src={assets.guestsIcon} alt="" className="" />
                  <span>Guests : {booking.guests}</span>
                </div>
                <p>Total:${booking.totalPrice}</p>
              </div>
            </div>
            {/* Date and Timings */}
            <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
              <div>
                <p>Check-In:</p>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.checkInDate).toDateString()}
                </p>
              </div>
              <div>
                <p>Check-Out:</p>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.checkOutDate).toDateString()}
                </p>
              </div>
            </div>
            {/* Paymentstatus */}
            <div className="flex flex-col items-start justify-center pt-3">
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    booking.isPaid ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <p
                  className={`text-sm ${
                    booking.isPaid ? "text-green-500" : "text-red-500"
                  }`}
                >
                  $ {booking.isPaid ? "Paid" : " Unpaid"}
                </p>
              </div>
              {!booking.isPaid && (
                <button className="cursor-pointer px-4 pt-1.5 mt-4 ytext-xs border border-gray-400 rounded-full hover-bg-gray-50 transition-all">
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
