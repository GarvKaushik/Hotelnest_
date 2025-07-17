import express from "express";
import upload from "../middleware/uploadMIddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  CreateRoom,
  getOwnerRooms,
  getRooms,
  toggleRoomAvailability,
} from "../controllers/roomContoller.js";
const roomRouter = express.Router();
roomRouter.post("/", upload.array("images", 4), protect, CreateRoom);
roomRouter.get("/", getRooms);
roomRouter.get("/owner", protect, getOwnerRooms);
roomRouter.post("/toggle-availability", protect, toggleRoomAvailability);

export default roomRouter;
