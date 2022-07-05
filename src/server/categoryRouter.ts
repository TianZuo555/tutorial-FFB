import { category } from '../db/types/dbTypes';
import eCommerceDataBase from '../db/eCommerceDB';
import express from 'express';
import winston from 'winston';

const router = express.Router();
const db = new eCommerceDataBase();

/**
 * @openapi
 * /api/categories:
 *   get:
 *     description: get all categories
 *     responses:
 *       200:
 *         description: Returns a list of categories.
 */
router.get('/categories', (req, res) => {
    const categories = db.Categories;
    res.send(categories);
});

/**
 * @openapi
 * /api/category/{categoryId}:
 *   get:
 *     description: get category by id
 *     parameters:
 *      - in: path
 *        name: categoryId
 *     responses:
 *       200:
 *         description: return category.
 */

router.get('/category/:id', (req, res) => {
    const categoryId = req.params.id;
    const result = db.readECommerceDB(Number.parseInt(categoryId));
    res.send(result);
});

/**
 * @openapi
 * /api/category:
 *   post:
 *     description: Create a new category
 *     consumes:
 *      - application/json
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *          type : object
 *          required:
 *            - title
 *          properties:
 *            title :
 *              type : string
 *     responses:
 *       200:
 *         description: Returns the added category.
 */
router.post('/category', (req, res) => {
    try {
        const { title, imageUrl } = req.body;
        const id = Math.random();
        const category: category = { id, title, imageUrl };
        db.writeCategoryToDB(category);
        res.send(category);
    } catch (error) {
        winston.error(error);
        res.status(500).send(error);
    }
});

/**
 * @openapi
 * /api/products:
 *   post:
 *     description: get all products 
 *     consumes:
 *      - application/json
 *     requestBody:
 *      content:
 *       application/json:
 *     responses:
 *       200:
 *         description: Returns the products by type.
 */
router.get('/products',(req, res)=>{
  try {
    const products = db.readProducts();
    console.log(products)
    res.send(products);
  } catch (error) {
    winston.error(error);
    res.status(500).send(error);
  }
})

/**
 * @openapi
 * /api/products/{type}:
 *   post:
 *     description: get products by its type
 *     consumes:
 *      - application/json
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *          type : object
 *          required:
 *            - type
 *          properties:
 *            type:
 *              type : string
 *       application/json:
 *     responses:
 *       200:
 *         description: Returns the products by type.
 */
router.get('/products/:type',(req, res)=>{
  try {
    const { type }  = req.params;
    console.log('test')
    const products = db.getProductsByType(type);
    res.send(products);
  } catch (error) {
    winston.error(error);
    res.status(500).send(error);
  }
})

/**
 * @openapi
 * /api/products/{id}:
 *   post:
 *     description: get products by id
 *     consumes:
 *      - application/json
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *          type : object
 *          required:
 *            - type
 *          properties:
 *            type:
 *              type : string
 *       application/json:
 *     responses:
 *       200:
 *         description: Returns the products by type.
 */
router.get('/products/:id',(req, res)=>{
  try {
    console.log('id')
    const { id }  = req.params;
    const pid = Number.parseInt(id);
    const products = db.getProductsById(pid);
    res.send(products);
  } catch (error) {
    winston.error(error);
    res.status(500).send(error);
  }
})

export default router;
