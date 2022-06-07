import jwt from 'jsonwebtoken';
import { user } from '../types/dbTypes';

const tokenSecret = process.env.jwtSecret || 'secret';

export function getToken(username: string, email: string): string {
    return jwt.sign({ username, email }, tokenSecret, { expiresIn: '1h' });
}

export function isValidToken(token: string): boolean {
    try {
        jwt.verify(token, tokenSecret);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export function decodeToken(token: string): user {
    return jwt.decode(token) as user;
}
