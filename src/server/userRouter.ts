import { decodeToken, getToken, isValidToken } from '../db/utils/tokenUtils';

import UserDB from '../db/userDB';
import crypto from 'crypto';
import express from 'express';
import { userMessages } from './../db/dbContants';

const userRouter = express.Router();
const db = new UserDB();

userRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.readUser(username, password);

    if (user) {
        const token = getToken(username, user.email);

        return res.json({
            username: user.username,
            token,
        });
    } else {
        return res.status(401).send('Invalid username or password');
    }
});

userRouter.post('/signup', (req, res) => {
    const { username, password, email, name } = req.body;

    try {
        // TODO encrypted password
        const message = db.createUser({
            id: db.getNextId(),
            username,
            password, // crypto.createHash('sha256').update(password).digest('hex'),
            email,
            name,
            type: 'user',
        });

        if (message.code !== userMessages.createdSuccessfully.code) {
            res.status(400).send(message.message);
        }

        const token = getToken(username, email);

        res.json({
            message: userMessages.createdSuccessfully.message,
            token,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

userRouter.post('/verify', (req, res) => {
    const { token } = req.body;

    if (isValidToken(token)) {
        const { username, email } = decodeToken(token);

        return res.send(`${username} is logged in, email is ${email}`);
    } else {
        return res.status(401).send('Invalid token');
    }
});

export default userRouter;
