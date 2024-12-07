import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoute.js';
import galleryRouter from './routes/galleryRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import roomRouter from './routes/roomRoute.js';
import bookingRouter from './routes/bookingRoute.js';

import dotenv from 'dotenv';
import cors from 'cors';
import feedbackRouter from './routes/feedbackRoute.js';

dotenv.config();



const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173', // Allow your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true
}));


// Middleware to verify JWT

app.use((req, res, next) => {
    const token = req.headers['authorization']?.replace('Bearer ', "")

    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    console.warn("Token has expired:", err.expiredAt); // Debugging log
                    return res.status(401).json({
                        message: "Session expired. Please log in again.",
                        error: err.message,
                    });
                }
                console.error("Token verification error:", err);
                return res.status(401).json({ message: "Invalid token, please login again", error: err.message });
            }
            req.user = decoded; // Attach the decoded user info to the request
            
            next();
        });
    } else {
        next();
       
    }
});

app.use("/api/user", userRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/category", categoryRouter);
app.use("/api/rooms", roomRouter)
app.use("/api/booking", bookingRouter)
app.use("/api/feedback", feedbackRouter);




// Connect to MongoDB

const connectionString = process.env.MONGO_URL

mongoose.connect(connectionString).then(
    () => {
        console.log('Connected to MongoDB');
    }
).catch(
    (error) => {
        console.error('Failed to connect to MongoDB',error);
    } 
    )

app.listen(5000, (req, res) => {
    console.log('Server is running on port 5000');
})