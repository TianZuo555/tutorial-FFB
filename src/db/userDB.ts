import { dbMessage, user } from './types/dbTypes';

import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { JsonDB } from 'node-json-db';
import { join } from 'path';
import { userMessages } from './dbContants';

export default class UserDB {
    db: any;
    constructor() {
        this.db = new JsonDB(new Config(join(__dirname, 'users.json'), true, false, '/'));
        this.db.load();
    }

    readUser(username: string, password: string): user | undefined {
        const result: user[] = this.db.getData('/users');
        return result.find((c) => c.username === username && c.password === password);
    }

    createUser(user: user): dbMessage {
        const allUsers: user[] = this.db.getData('/users');
        if (allUsers.find((c) => c.username === user.username)) {
            return userMessages.duplicatedUserName;
        }

        if (allUsers.find((c) => c.email === user.email)) {
            return userMessages.duplicatedEmail;
        }

        this.db.push('/users[]', user);

        return userMessages.createdSuccessfully;
    }

    getNextId() {
        const result: user[] = this.db.getData('/users');
        return result.length + 1;
    }
}
