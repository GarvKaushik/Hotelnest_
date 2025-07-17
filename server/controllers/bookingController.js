import Booking from "../models/bookings.js";
import Hotel from "../models/hotel.js";
import Room from "../models/rooms.js";

// function to check availability of room
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });
    const isAvailable = bookings.length === 0;
    return isAvailable;
  } catch (error) {
    console.log(error.message);
  }
};

/// api to check availablity of room
// post /api/bookings/check-availability
export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    res.json({
      success: true,
      isAvailable,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
//API to create a new Booking
//POST /api/bookings/book
export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user._id;

    // before booking check availability
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    if (!isAvailable) {
      return res.json({
        success: false,
        message: "room is not availablr",
      });
    }

    //get total price from room
    const roomData = await Room.findById(room).populate("hotel");
    let totalPrice = roomData.pricePerNight;
    // total price according to days
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timediff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timediff / (1000 * 3600 * 24));
    totalPrice *= nights;
    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    res.json({
      success: true,
      message: "Booking Created successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to create booking",
    });
  }
};

// api to get all bookings for a user
//get /api/bookings/user

export const getuserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

// API to get
export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res.json({
        success: false,
        message: "No hotel found",
      });
    }
    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });
    //totalbookings
    const totalBookings = bookings.length;
    // total revenue
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );
    res.json({
      success: true,
      dashboard: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to fetch booking",
    });
  }
};
