import Room from "../models/rooms.js";
import Hotel from "../models/hotel.js";
import { v2 as cloudinary } from "cloudinary";
import { EndpointCreatedEventDataSerializer } from "svix/dist/models/endpointCreatedEventData.js";

//// API to create Room
export const CreateRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel)
      return res.json({
        success: false,
        message: "No Hotel Found",
      });
    // upload images to cloudinary
    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    // wait fot all images to be uploaded
    const images = await Promise.all(uploadImages);
    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });
    res.json({
      success: true,
      message: "Room created Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/// API to get all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      rooms,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/// API to get all rooms
export const getOwnerRooms = async (req, res) => {
  try {
    const HotelData = await Hotel.findOne({
      owner: req.auth.userId,
    });
    const rooms = await Room.find({
      hotel: HotelData._id.toString(),
    }).populate("hotel");
    res.json({
      success: true,
      rooms,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
/// API to get all rooms
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();
    res.json({
      success: true,
      message: "Room Availablity updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
