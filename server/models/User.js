import mongoose from "mongoose";
const userschema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, enum: ["user", "hotelowner"], default: "user" },
    recentSearchedCities: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userschema);
export default User;
