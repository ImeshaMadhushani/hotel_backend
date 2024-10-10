import mongoose from "mongoose";
import Room from "../models/roomModel.js";

export function createRoom(req, res) {
    const user = req.body;

    if (user == null) {
        return res.status(400).json({ message: "Invalid user data!" });
    }

    if (user.type != "admin") {
        return res.status(403).json({ message: "Only admins can create rooms!" });
    }

    const rooms = req.body.item;
    const newRoom = Category(rooms);
    newCategory.save().then(() => {
        res.status(201).json({ message: "Category created successfully!" });
    }).catch((error) => {
        res.status(400).json({ message: error.message });
    });
}


export function getAllRooms(req, res) {
    try {
        const roomId = req.params;

        const room = Room.findById(roomId).populate('category');

        if (!room) {
            return res.status(404).json({ message: "Room not found!" });
        }
        res.status(200).json({
            roomNumber: room.roomNumber,
            category: room.category,
            price: room.price,
            available: room.available,
            booked: room.booked,
            bookedFrom: room.bookedFrom,
            bookedTo: room.bookedTo,
            images: room.images
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving room details", error: error.message });
    }

}

export async function bookRoom(req, res) {
    const roomId = req.params.id;
    const user = req.body;

    if (user == null) {
        return res.status(400).json({ message: "Invalid user data!" });
    }

    try {
        const { roomId, bookedFrom, bookedTo } = req.body;
        
        const room = await Room.findById(roomId).populate('category');

        if (!room) {
            return res.status(404).json({ message: "Room not found!" });
        }
        
        if (room.booked) {
            return res.status(400).json({ message: "Room is already booked!" });
        } else {
            room.booked = true;
            room.bookedFrom = new Date(bookedFrom);
            room.bookedTo = new Date(bookedTo);
            room.available = false;

        
            await room.save();

            return res.status(200).json({
                message: "Room booked successfully!",
                room: {
                    roomNumber: room.roomNumber,
                    category: room.category,
                    price: room.price,
                    bookedFrom: room.bookedFrom,
                    bookedTo: room.bookedTo,
                    available: room.available,
                    images: room.images
                }
            });
        }

    } catch (error) {
        return res.status(500).json({ message: "Error booking room", error: error.message });
    }
}