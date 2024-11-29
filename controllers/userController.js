import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


dotenv.config();

export async function postUser(req, res) {
    const { name, email, whatsapp, firstName, lastName, phone, password } = req.body;
    /*  const user = req.body;
    const password = req.body.password;  */
    const saltRound = 10;
   

    try{
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
        }
        
        const passwordHash = bcrypt.hashSync(password, saltRound);

    /* user.password = passwordHash; */

        const newUser = new User({
        name,
        email,
        whatsapp,
            password: passwordHash,
            firstName, // Include this field
            lastName,  // Include this field
            phone,  
    })

        await newUser.save()
        console.log("Received data:", req.body);
        
        res.status(201).json({ message: "User created successfully!" });
    }catch(error)  {
        res.status(500).json({ message: "Error creating user!" ,error: error.message });
    }
   
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

export function isAdminValid(req) {
   /*  const token = req.headers['authorization']?.split(' ')[1]; // Extract JWT token from the Authorization header

    if (!token) {
        return false; // No token provided
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY); // Verify JWT token
        return decoded.type === 'admin'; // Check if the user is an admin
    } catch (error) {
        return false; // Invalid token
    } */
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
    
    if (req.user.type == "customer") {
        return false;
    }
    
    return true;
}
 
//error
export function getUser(req, res) {
    const user = req.body.user;
    if (user == null) {
        return res.status(403).json({ message: "Not Found" });
    }
    else {
        res.json({ message:"Found",user: user });
    }
}

export function getAllUsers(req, res) {
    User.find().then((users) => {
        res.json({ message: "Users fetched successfully!", users: users });
    }).catch((error) => {
        res.status(500).json({ message: "Error fetching users!", error: error.message });
    });
}
