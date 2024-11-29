import express from "express";
import { createBooking, getBookings, editBooking, deleteBooking } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking)
bookingRouter.get("/", getBookings)
bookingRouter.put("/:bookingId", editBooking)
bookingRouter.delete("/:bookingId", deleteBooking)

export default bookingRouter;