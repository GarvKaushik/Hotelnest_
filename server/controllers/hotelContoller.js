import Hotel from "../models/hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    // check if user is already registered
    const hotel = await Hotel.findOne({ owner });
    if (hotel) {
      return res.json({
        success: true,
        message: "Hotel Already Registered",
      });
    }
    await Hotel.create({ name, address, contact, city, owner });
    await User.findByIdAndUpdate(owner, { role: "hotelowner" });
    res.json({
      success: true,
      message: "Hotel Registered Successfully",
    });
  } catch (error) {}
};
