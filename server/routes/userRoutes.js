import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getuserData } from "../controllers/userControllers.js";
import { storeRecentSearchedCities } from "../controllers/userControllers.js";
const userRouter = express.Router();

userRouter.get("/", protect, getuserData);
userRouter.post("/store-recent-search", protect, storeRecentSearchedCities);

export default userRouter;
