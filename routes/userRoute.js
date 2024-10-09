import express from 'express';
import { postUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/', postUser);



export default userRouter;