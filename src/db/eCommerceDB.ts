import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { JsonDB } from 'node-json-db';
import { category , product} from './types/dbTypes';
import { join } from 'path';

class eCommerceDataBase {
    db;
    productsDb;

    categories : category[];
    products: product[];

    constructor() {
        const fileLocation = join(__dirname, 'eCommerce.json');
        this.db = new JsonDB(new Config(fileLocation, true, false, '/'));
        this.db.load();

        this.categories = this.db.getData('/categories');

        // products db support 
        const productLocation = join(__dirname, 'products.json');
        this.productsDb = new JsonDB(new Config(productLocation, true, false, '/'));
        this.productsDb.load();

        this.products = this.productsDb.getData('/products');
    }

    get Categories(): category[] {
        const result = this.categories;
        return result;
    }

    readECommerceDB(id: number) {
        const result: category[] = this.categories;
        return result.find(c => c.id === id);
    }

    writeCategoryToDB(category: category) {
        if(this.categories.some(c => c.title === category.title || c.id === category.id)) { 
            throw new Error("Category already exists");
        }
        this.db.push("/categories[]", category)
    }

    readProducts() {
        const result = this.products;
        return result;
    }

    getProductsByType(type : string) {
        console.log(type)
        const allProducts = this.products;
        
        return allProducts.filter((p: product)=> p.type === type);
    }

    getProductsById(id : number) {
      const allProducts = this.products;

      return allProducts.find((p:product) => p.id === id);
    }
}

export default eCommerceDataBase;
