import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkwebhooks from "./controllers/clerkWebHooks.js";

connectDB();
const app = express();
app.use(cors()); // cross origin resource sharing
app.use(express.json());
app.use(clerkMiddleware());

//API for clerkwebhooks
app.use("/api/clerk", clerkwebhooks);

app.get("/", (req, res) => {
  return res.send("API is maybe Working");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
