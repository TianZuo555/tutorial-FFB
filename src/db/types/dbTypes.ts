export type eCommerceDB = {
    dbPath: string;
    dbName: string;
    columns: Column[];
};

export type Column = {
    name: string;
}

export type category = {
    id: string;
    name: string;
}