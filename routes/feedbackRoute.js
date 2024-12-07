import express from "express";
import {
    getAllFeedback,
    updateFeedback,
    deleteFeedback,
    getFeedbackById,
    createFeedback
} from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();

// Route to post feedback
feedbackRouter.post("/", createFeedback);

// Route to get all feedback
feedbackRouter.get("/", getAllFeedback);

// Route to get feedback for a specific user
feedbackRouter.get("/:id", getFeedbackById);

// Route to approve feedback (admin only)
feedbackRouter.put("/:id", updateFeedback);

// Route to delete feedback (admin only)
feedbackRouter.delete("/:id", deleteFeedback);

export default feedbackRouter;
