declare namespace dbTypes {
    type eCommerceDB = {
        dbPath: string;
        dbName: string;
        columns: Column[];
    };

    type Column = {
        name: string;
    };

    type category = {
        id: number;
        title: string;
        imageUrl: String;
    };

    type user = {
        id: number;
        username: string;
        password: string;
        name: string;
        email: string;
        type: string;
    };

    type dbMessage = {
        code: string;
        message: string;
    };
    
    type product = {
      id: number;
      name: string;
      type: string;
      price: number;
      imageUrl: string; 
    }
}

export = dbTypes;
