import Booking from "../models/bookingModel.js";
import { isCustomerValid , isAdminValid} from "./userController.js";

export function createBooking(req, res) {

     if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Invalid authorization credentials"
        });
       
    } 

    const { roomId, start, end, email, status, reason, notes } = req.body;

    // Check if required fields are provided
     if (!roomId || !start || !end) {
        return res.status(400).json({
            message: "Room ID, start time, and end time are required"
        });
    } 

    // Ensure the start and end fields are valid Date objects
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Check if the dates are valid
    if (isNaN(startDate) || isNaN(endDate)) {
        return res.status(400).json({
            message: "Invalid start or end date"
        });
    }

    const startingId = 1000;

    Booking.countDocuments({}).then(
        (count) => {
            console.log(count);
            const newId = startingId + count + 1;
            const newBooking = new Booking({
                bookingId: newId,
                roomId: roomId,
                email: email,
                status: status || 'pending', // Default to 'pending' if not provided
                reason: reason,
                start: startDate,  // Use the Date object
                end: endDate,      // Use the Date object
                notes: notes 
            })
            newBooking.save().then(
                (result) => {
                    res.json({
                        message: "Booking created successfully",
                        result: result
                    });
                }).catch(
                    (err) => {
                        console.error("Error creating booking:", err); // Log the error
                        res.status(500).json({
                            message: "Booking creation failed",
                            error: err.message
                        })
                    }
                )

        }
    ).catch(
        (err) => {
            
            res.status(500).json({
                message: "Failed to fetch booking count",
                error: err
            })
        }
    )

    
}


export function getBookings(req, res) {
    // Optional: You can add authentication/authorization checks here if needed
    Booking.find()
        .then((bookings) => {
            res.json({
                message: "Bookings fetched successfully",
                bookings: bookings
            });
        })
        .catch((err) => {
            console.error("Error fetching bookings:", err);
            res.status(500).json({
                message: "Failed to fetch bookings",
                error: err.message
            });
        });
}

// Edit Booking (Only Admin can Edit)
export function editBooking(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized access. Only admin can edit bookings."
        });
    }

    const bookingId = req.params.bookingId;
    const updatedData = req.body;

    Booking.findByIdAndUpdate(bookingId, updatedData, { new: true })
        .then((updatedBooking) => {
            if (!updatedBooking) {
                return res.status(404).json({
                    message: "Booking not found"
                });
            }
            res.json({
                message: "Booking updated successfully",
                updatedBooking
            });
        })
        .catch((err) => {
            console.error("Error editing booking:", err);
            res.status(500).json({
                message: "Failed to update booking",
                error: err.message
            });
        });
}

// Delete Booking (Only Admin can Delete)
export function deleteBooking(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized access. Only admin can delete bookings."
        });
    }

    const bookingId = req.params.bookingId;

    Booking.findByIdAndDelete(bookingId)
        .then((deletedBooking) => {
            if (!deletedBooking) {
                return res.status(404).json({
                    message: "Booking not found"
                });
            }
            res.json({
                message: "Booking deleted successfully",
                deletedBooking
            });
        })
        .catch((err) => {
           // console.error("Error deleting booking:", err);
            res.status(500).json({
                message: "Failed to delete booking",
                error: err.message
            });
        });
}