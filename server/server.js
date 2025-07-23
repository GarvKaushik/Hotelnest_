import express from "express";
import "dotenv/config";

import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkwebhooks from "./controllers/clerkWebHooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoute.js";
// eslint-disable-next-line import/extensions
import connectCloudinary from "./config/cloudinary.js";
import roomRouter from "./routes/roomRoute.js";
import bookingRouter from "./routes/bookingRoutes.js";
import { stripePayment } from "./controllers/bookingController.js";
import { stripeWebHooks } from "./controllers/stripeWebhooks.js";

connectDB();
connectCloudinary();
const app = express();

app.use(cors()); // cross origin resource sharing
// api to listen to stripe
app.post(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebHooks
);
app.use(express.json());

app.use(clerkMiddleware());
app.use("/api/clerk", clerkwebhooks);

app.get("/", (req, res) => {
  return res.send("API is maybe Working");
});

app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
