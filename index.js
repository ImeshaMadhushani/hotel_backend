import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoute.js';
import galleryRouter from './routes/galleryRoute.js';
import categoryRouter from './routes/categoryRoute.js';

const app = express();

app.use(bodyParser.json());

app.use("/api/user", userRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/category", categoryRouter);

// Middleware to verify JWT

app.use((req, res, next) => {
    const token = req.header['authorization']?.replace('Bearer ', "")
    
    if (token) {
        jwt.verify(token, "secret", (err, decoded) => {
            if (decoded != null) {
                req.user = decoded
                next();
            } else {
                next();
            }
        });
    } else {
        next();
    }
});

// Connect to MongoDB

const connectionString = process.env.MONGO_URL

mongoose.connect(connectionString).then(
    () => {
        console.log('Connected to MongoDB');
    }
).catch(
    () => {
        console.log('Failed to connect to MongoDB');
    } 
    )

app.listen(5000, (req, res) => {
    console.log('Server is running on port 5000');
})