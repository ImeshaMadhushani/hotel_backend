import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoute.js';

const app = express();

app.use(bodyParser.json());

app.use("/api/user", userRouter);

// Middleware to verify JWT

app.use((req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer', "")
    
    if (!token) {
        jwt.verify(token, "secret", (err, decoded) => {
            if (decoded != null) {
                req.user = decoded
                next()
            } else {
                next()
            }
        })
    } else {
        next()
    }
});

// Connect to MongoDB

const connectionString = "mongodb+srv://hotel:hotel@cluster0.prmky.mongodb.net/HotelDB?retryWrites=true&w=majority&appName=Cluster0";

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