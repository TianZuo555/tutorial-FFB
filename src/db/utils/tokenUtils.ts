import jwt from 'jsonwebtoken';

const tokenSecret = process.env.jwtSecret || 'secret';

export function getToken(username: string): string {
    return jwt.sign({ username }, tokenSecret, { expiresIn: '1h' });    
}

export function isValidToken(token: string) : boolean {
    try {
        jwt.verify(token, tokenSecret);
        return true;
    } catch (e) {
        console.error(e)
        return false;
    }
}