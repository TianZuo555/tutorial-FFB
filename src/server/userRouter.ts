import UserDB from '../db/userDB';
import crypto from 'crypto';
import express from 'express';

const userRouter = express.Router();
const db = new UserDB();

const algorithm = 'aes-256-cbc';

userRouter.post('/user', (req, res) => {
    const { username, password, email, name} = req.body;

    res.send(123);
});

export default userRouter;
