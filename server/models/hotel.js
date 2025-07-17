import mongoose from "mongoose";
const hotelschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    owner: { type: String, required: true, ref: "User" },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelschema);
export default Hotel;
