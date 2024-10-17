import Booking from "../models/bookingModel.js";
import { isCustomerValid } from "./userControllers.js";

export function createBooking(req, res) {

    if (!isCustomerValid(req)) {
        return res.status(403).json({
            message: "Invalid customer credentials"
        });
        return;
    }

    const startingId = 1000;

    Booking.countDocuments({}).then(
        (count) => {
            console.log(count);
            const newId = "INV" + startingId + count + 1;
            const newBooking = new Booking({
                bookingId: newId,
                customerId: req.body.customerId,
                roomId: req.body.roomId,
                start: req.body.start,
                end: req.body.end,
            })
            newBooking.save().then(
                (result) => {
                    res.json({
                        message: "Booking created successfully",
                        result: result
                    });
                }).catch(
                    (err) => {
                        res.status(500).json({
                            message: "Booking creation failed"
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
