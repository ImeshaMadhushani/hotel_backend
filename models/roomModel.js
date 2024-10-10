import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
    {
        roomNumber: {
            type: Number,
            required: true
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        booked: {
            type: Boolean,
            default: false
        },

        bookedFrom: {
            type: Date
        },

        bookedTo: {
            type: Date
        },

        images: [
            {
                type: String
            }
        ],

        available: {
            type: Boolean,
            default: true
        },

        price: {
            type: Number,
            required: true
        }
        
    }
)

const Room = mongoose.model("Room", roomSchema);

export default Room;