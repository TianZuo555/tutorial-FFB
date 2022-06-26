import { getToken } from '../utils/tokenUtils';
import { verify } from 'jsonwebtoken';

export const authorizer = (username: string, password: string): boolean => {
    console.log('auth');
    console.log(username, password);
    return true;
};
