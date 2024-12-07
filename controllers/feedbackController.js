import Feedback from "../models/feedbackModel.js";
import { isAdminValid } from "./userController.js"; // Import isAdminValid function

// Create feedback
export const createFeedback = async (req, res) => {
    try {
        const userId = req.user?.id; // Ensure `req.user` is populated from the middleware
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. User not logged in." });
        }

        const { rating, message } = req.body;

        if (!rating || !message) {
            return res.status(400).json({ message: "Rating and message are required." });
        }

        const feedback = new Feedback({
            user: userId,
            rating,
            message,
        });

        await feedback.save();
        res.status(201).json({ message: "Feedback created successfully." });
    } catch (error) {
        console.error("Error creating feedback:", error);
        res.status(500).json({ message: "Error creating feedback", error: error.message });
    }
};

/* export async function createFeedback(req, res) {
    const { userId, message, rating } = req.body;

    try {
        const feedback = new Feedback({
            userId,
            message,
            rating,
        });

        const savedFeedback = await feedback.save();
        res.status(201).json({ message: "Feedback submitted successfully!", feedback: savedFeedback });
    } catch (error) {
        res.status(500).json({ message: "Error submitting feedback.", error: error.message });
    }
} */

// Get all feedback
export async function getAllFeedback(req, res) {
    try {
        const feedbacks = await Feedback.find();
        res.json({ message: "Feedback fetched successfully!", feedbacks });
    } catch (error) {
        res.status(500).json({ message: "Error fetching feedback.", error: error.message });
    }
}

// Approve feedback (admin only)
export async function updateFeedback(req, res) {
    const { id } = req.params; // Feedback ID from the request params

    try {
        const isAdmin = await isAdminValid(req);

        if (!isAdmin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const updatedFeedback = await Feedback.findByIdAndUpdate(
            id,
            { approved: true },
            { new: true }
        );

        if (!updatedFeedback) {
            return res.status(404).json({ message: "Feedback not found." });
        }

        res.json({ message: "Feedback approved successfully!", feedback: updatedFeedback });
    } catch (error) {
        res.status(500).json({ message: "Error updating feedback.", error: error.message });
    }
}

// Delete feedback (admin only)
export async function deleteFeedback(req, res) {
    const { id } = req.params; // Feedback ID from the request params

    try {
        const isAdmin = await isAdminValid(req);

        if (!isAdmin) {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const deletedFeedback = await Feedback.findByIdAndDelete(id);

        if (!deletedFeedback) {
            return res.status(404).json({ message: "Feedback not found." });
        }

        res.json({ message: "Feedback deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting feedback.", error: error.message });
    }
}

// Get feedback by ID
export async function getFeedbackById(req, res) {
    const { id } = req.params;

    try {
        const feedback = await Feedback.findById(id);

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found." });
        }

        res.json({ message: "Feedback fetched successfully!", feedback });
    } catch (error) {
        res.status(500).json({ message: "Error fetching feedback.", error: error.message });
    }
}
