import { type } from "os";

export type eCommerceDB = {
    dbPath: string;
    dbName: string;
    columns: Column[];
};

export type Column = {
    name: string;
};

export type category = {
    id: number;
    title: string;
    imageUrl: String;
};

export type user = {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    type: string;
}

export type dbMessage = {
    code: string;
    message: string;
}