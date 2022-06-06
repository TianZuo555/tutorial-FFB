import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { JsonDB } from "node-json-db";
import { join } from "path";
import { user } from './types/dbTypes';

export default class UserDB {
    db : any;
    constructor() {
        this.db = new JsonDB(new Config(join(__dirname, 'users.json'), true, false, '/'));
        this.db.load();
    }

    readUser(id: number) {
        const result: user[] = this.db.getData("/users");
        return result.find(c => c.id === id);
    }

    createUser(user: user) {
        if(this.readUser(user.id)) { 
            throw new Error("User already exists");
        }
        this.db.push("/users[]", user)
    }
} 