import express from "express";
import { createRoom, deleteRoom, getRoom, getRoomByCategory, findRoomById, updateRoom } from "../controllers/roomController.js";

const roomRouter = express.Router();

roomRouter.post("/", createRoom)
roomRouter.delete("/:roomId", deleteRoom)
roomRouter.get("/", getRoom)
roomRouter.get("/byCategory/:category", getRoomByCategory)
roomRouter.get("/:roomId", findRoomById)
roomRouter.put("/:roomId", updateRoom)


export default roomRouter;