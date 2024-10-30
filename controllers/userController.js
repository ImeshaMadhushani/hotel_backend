import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';

dotenv.config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Store file with unique name
    }
});

const upload = multer({ storage: storage });

export function postUser(req, res) {
    const user = req.body;
    const password = req.body.password;
    const saltRound = 10;
    const passwordHash = bcrypt.hashSync(password, saltRound);
    

    user.password = passwordHash;

    if (req.file) {
        user.profilePic = req.file.path; // Save the profile picture path
    }


    const newUser = new User(user)

    newUser.save().then(() => {
        
        res.status(201).json({ message: "User created successfully!" });
    }).catch((error) => {
        res.status(500).json({ message: "Error creating user!" ,error: error.message });
    })
}

export function login(req, res) {
    const credentials = req.body;

    User.findOne({ email: credentials.email}).then((user)=> {
        if (user==null) {
            res.status(401).json({ message: "Invalid email or password!" });
        } else {
            const isPasswordValid = bcrypt.compare(credentials.password, user.password)
            if (!isPasswordValid) { 
            res.status(401).json({ message: "Invalid password!" });
            } else {
                const payload = {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    type: user.type
                }

                const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '48h' });
                return res.json({ message: "User logged in successfully!",user:user, token: token });
            }
        }
    }).catch((error) => {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Server error" });
    });
}

export function isAdminValid(req){
    if (req.user == null) { 
        return false;
    }
    
    if (req.user.type!= "admin") {
        return false;
    }
    
    return true;
}

export function isCustomerValid(req) {
    if (req.user == null) {
        return false;
    }
    
    if (req.user.type!= "customer") {
        return false;
    }
    
    return true;
}
 
export function getUser(req, res) {
    const user = req.body.user;
    if (user == null) {
        return res.status(403).json({ message: "Not Found" });
    }
    else {
        res.json({ message:"Found",user: user });
    }
}