import express from 'express';
import { postUser, login, getUser, getAllUsers} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post('/',postUser);
userRouter.post('/login', login);
userRouter.get('/', getAllUsers)
userRouter.get('/user', getUser)



export default userRouter;