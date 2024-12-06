import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },

        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        comment: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now
        }

    }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
