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

    readUser(username: string, password: string) : user | undefined {
        const result: user[] = this.db.getData("/users");
        return result.find(c => c.username === username && c.password === password);
    }

    createUser(user: user) {
        if(this.readUser(user.username, user.password)) { 
            throw new Error("User already exists");
        }
        
        this.db.push("/users[]", user)
    } 
    
    getNextId() {
        const result: user[] = this.db.getData("/users");
        return result.length + 1;
    }
} 