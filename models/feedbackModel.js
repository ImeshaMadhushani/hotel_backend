import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        message: {
            type: String,
            required: true,
        },
        approved: { type: Boolean, default: null }, // null = Pending, true = Approved, false = Disapproved
        /* status: {
            type: String,
            enum: ['pending', 'approved', 'disapproved'],
            default: 'pending',
        }, */
    },
    {
        timestamps: true,
    }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
