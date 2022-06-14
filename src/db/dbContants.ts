import { dbMessage, eCommerceDB } from './types/dbTypes';

export const eCommerceConstant: eCommerceDB = {
    dbPath: './db/',
    dbName: 'eCommerceDB',
    columns: [
        {
            name: 'products',
        },
    ],
};

export const duplicatedUserCode = 'USER_001';
export const duplicatedEmail = 'USER_002';
export const createdUserSuccessfully = 'USER_003';

export const userMessages: { [name: string]: dbMessage } = {
    duplicatedUserName: {
        code: duplicatedUserCode,
        message: 'User already exists',
    },
    duplicatedEmail: {
        code: duplicatedEmail, 
        message: 'User email already exists',
    },
    createdSuccessfully: {
        code: createdUserSuccessfully,
        message: 'User created successfully',
    },
};
