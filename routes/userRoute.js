import express from 'express';
import { postUser , login, getUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/', postUser);
userRouter.post('/login', login);
userRouter.get('/',getUser)



export default userRouter;