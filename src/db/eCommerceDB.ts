import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { JsonDB } from 'node-json-db';
import { category } from './types/dbTypes';
import { eCommerceConstant } from './dbContants';
import { join } from 'path';
class eCommerceDataBase {
    db;
    productsDb;

    constructor() {
        const fileLocation = join(__dirname, 'eCommerce.json');
        this.db = new JsonDB(new Config(fileLocation, true, false, '/'));
        this.db.load();

        // products db support 
        const productLocation = join(__dirname, 'products.json');
        this.productsDb = new JsonDB(new Config(productLocation, true, false, '/'));
        this.productsDb.load();
    }

    get Categories(): category[] {
        const result = this.db.getData("/categories")
        return result;
    }

    readECommerceDB(id: number) {
        const result: category[] = this.db.getData("/categories");
        return result.find(c => c.id === id);
    }

    writeCategoryToDB(category: category) {
        if(this.Categories.some(c => c.title === category.title || c.id === category.id)) { 
            throw new Error("Category already exists");
        }
        this.db.push("/categories[]", category)
    }

    readProducts() {
        const result = this.productsDb.getData('/products');
        return result;
    }
}

export default eCommerceDataBase;
