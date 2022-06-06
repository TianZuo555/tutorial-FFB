import { getToken, isValidToken } from '../db/utils/tokenUtils';

import UserDB from '../db/userDB';
import crypto from 'crypto';
import { decode } from 'jsonwebtoken';
import express from 'express';

const userRouter = express.Router();
const db = new UserDB();

userRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.readUser(username, password);

    if (user) {
        const token = getToken(username);

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

    db.createUser({
        id: db.getNextId(),
        username,
        password: crypto.createHash('sha256').update(password).digest('hex'),
        email,
        name,
        type: 'user',
    });

    res.send('User created');
});

userRouter.post('/verify', (req, res) => {
    const { token } = req.body;

    if (isValidToken(token)) {
        const { username } = decode(token) as { username: string };
        
        return res.send('Token verified, username is ' + username);
    } else {
        return res.status(401).send('Invalid token');
    }
});

export default userRouter;
