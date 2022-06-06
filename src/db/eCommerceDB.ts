import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { JsonDB } from 'node-json-db';
import { category } from './types/dbTypes';
import { eCommerceConstant } from './dbContants';
import { join } from 'path';
class eCommerceDataBase {
    db;

    constructor() {
        const fileLocation = join(__dirname, 'eCommerce.json');
        this.db = new JsonDB(new Config(fileLocation, true, false, '/'));
        this.db.load();
    }

    get Categories(): category[] {
        const result = this.db.getData("/categories")
        return result;
    }

    readECommerceDB(id: string) {
        // return this.db.find("/category[]")
    }

    writeCategoryToDB(category: category) {
        if(this.Categories.some(c => c.title === category.title || c.id === category.id)) { 
            throw new Error("Category already exists");
        }
        this.db.push("/categories[]", category)
    }
}

export default eCommerceDataBase;
