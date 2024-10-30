import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
    {
        roomId: {
            type: Number,
            required: true,
            unique: true
        },

        category: {
            type: String,
            required: true
        },

        maxGuests: {
            type: Number,
            required: true,
            default: 3
        },

        available: {
            type: Boolean,
            required: true,
            default: true
        },

        photos: [
            {
                type: String
            }
        ],

        specialDescription: {
            type: String,
            default: ""
        },

        notes: {
            type: String,
            default: ""
        },
        price: {
            type: Number,
            required: true, // Set to true if price must be provided
            min: 0 // Optional: Ensures price cannot be negative
        }


    }
)

const Room = mongoose.model("Room", roomSchema);

export default Room;