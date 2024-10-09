import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const app = express();

// Connect to MongoDB

const connectionString = "mongodb+srv://hotel:hotel@cluster0.prmky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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