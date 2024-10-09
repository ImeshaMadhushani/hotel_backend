import express from 'express';
import { postUser , login } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/', postUser);
userRouter.post('/login',login);



export default userRouter;