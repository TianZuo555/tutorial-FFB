import { JSONFile } from 'lowdb/lib';
import { category } from './types/dbTypes'
import { eCommerceConstant } from './dbContants';
import { fileURLToPath } from 'url'
import { join } from 'path';

// import { join } from 'node:path';

class eCommerceDataBase {
    db: any;

    constructor() {
        const file = join(__dirname, 'db.json');
        // const adapter = new JSONFile(file);
        // this.db = new Low(adapter);
    }

    async readECommerceDB() {
        await this.db.read();
        const { eCommerce } = this.db.data;
        return eCommerce;
    }

    async writeCategoryToDB(category:category) {
        await this.db.read();
        const { eCommerce } = this.db.data;
        eCommerce.push(category);
        await this.db.write();
    }
}

export default eCommerceDataBase;
