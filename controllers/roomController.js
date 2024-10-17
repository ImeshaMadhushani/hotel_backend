import Room from "../models/roomModel.js";
import {isAdminValid} from "./userController.js"

export function createRoom(req, res) {
    if (!isAdminValid(req)) {
        res.status(403).json({ message: "Unauthorized to create room" })
        return;
    }
   
    const newRoom = new Room(req.body)
    newRoom.save().then(
        (result) => {
            res.status(201).json({ message: "Room created successfully!", result: result });
        }
    ).catch((err) => {
        res.status(500).json({ message: "Error creating room!", error: err.message });
    })
}

export function deleteRoom(req, res) { 
    if (!isAdminValid(req)) {
        res.status(403).json({ message: "Unauthorized to delete room" })
        return;
    }

    const roomId = req.params.roomId;

    Room.findByIdAndDelete({ roomId: roomId }).then(
        (result) => {
            if (!result) {
                return res.status(404).json({ message: "Room not found!" });
            }
            res.status(200).json({ message: "Room deleted successfully!" });
        }
    ).catch((err) => {
        res.status(500).json({ message: "Error deleting room!", error: err.message });
    })
}

export function findRoomById(req, res) { 
    const roomId = req.params.roomId;

    Room.findOne({ roomId: roomId }).then(
        (result) => {
            if (!result) {
                return res.status(404).json({ message: "Room not found!" });
                return;
            } else {
                res.json({
                    message: "Room found successfully",
                    result: result
                })
            }
        }
    ).catch(
        (err) => {
            res.status(500).json({ message: "Error retrieving room details", error: err});
        }
    )
}

export function getRoom(req, res) {
    Room.find().then(
        (result) => {
            res.json({message:"Rooms found successfully",result:result})
        }
    ).catch((err) => {
        res.status(500).json({ message: "Error retrieving rooms", error: err});
    
    })
}

export function getRoomByCategory(req, res) {
    const category = req.params.category;

    Room.find({ category: category }).then(
        (result) => {
            if (!result) {
                res.status(404).json({
                    message: "No rooms found for this category"
                });
                return;
            } else {
                res.json({
                    message: "Rooms found successfully",
                    result: result
                })
            }
        }
    ).catch((err) => {
        res.status(500).json({
            message: "Failed to find rooms",
            error: err
        })
    }
    )
}

//update room
export function updateRoom(req, res) {
    if (!isAdminValid(req)) {
        res.status(403).json({
            message: "Unauthorized to update a room"
        })
        return;
    }
    const roomId = req.params.roomId;

    Room.findByIdAndUpdate({ roomId: roomId }, req.body, { new: true }).then(
        (result) => {
            if (!result) {
                res.status(404).json({
                    message: "Room not found"
                });
                return;
            } else {
                res.json({
                    message: "Room updated successfully",
                    result: result
                })
            }
        }).catch({
            message: "Failed to update room",
            error: err
        })

} 

