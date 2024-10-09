import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export function postUser(req, res) {
    const user = req.body;
    console.log(user);
    const password = req.body.password;
    const saltRound = 10;
    const passwordHash = bcrypt.hashSync(password, saltRound);
    console.log('Hashed Password:', passwordHash);

    user.password = passwordHash;

    const newUser = new User(user)

    newUser.save().then(() => {
        
        res.status(201).json({ message: "User created successfully!" });
    }).catch((error) => {
        res.status(500).json({ message: "Error creating user!" ,error: error.message });
    })
}

export function login(req, res) {
    const credentials = req.body;

    User.findOne({ email: credentials.email, password: credentials.password }).then((user)=> {
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password!" });
        } else {
            const isPasswordValid = bcrypt.compare(user.password, credentials.password)
            if (!isPasswordValid) { 
                return res.status(401).json({ message: "Invalid password!" });
            } else {
                const payload = {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    image: user.image,
                    type: user.type,
                    phone: user.phone,
                    whatsapp: user.whatsapp,
                    disabled: user.disabled,
                }

                const token = jwt.sign(payload, 'secret', { expireIn: '48h' })
                res.json({ message: "User logged in successfully!",user:user, token: token });
            }
        }
    })
}