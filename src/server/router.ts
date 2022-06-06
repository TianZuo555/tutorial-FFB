import { category } from '../db/types/dbTypes';
import eCommerceDataBase from '../db/eCommerceDB';
import express from 'express'
import { nanoid } from 'nanoid';
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
 *         description: Returns a mysterious string.
 */
router.get("/categories", (req, res) => {
    const categories = db.Categories;
    res.send(categories);
})

/**
 * @openapi
 * /api/category/{categoryId}:
 *   get:
 *     description: get category by id
 *     parameters:
 *      - in: categoryId
 *     responses:
 *       200:
 *         description: return category.
 */

router.get("/category/:id", (req, res) => {
    db.readECommerceDB
})

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
 *            - name 
 *          properties:
 *            name : 
 *              type : string
 *     responses:
 *       200:
 *         description: Returns the added category.
 */
router.post("/category", (req, res) => {
    try {
        const { title, imageUrl} = req.body;
        const id = nanoid();
        const category: category = { id , title, imageUrl} 
        db.writeCategoryToDB(category);
        res.send(category);
    } catch (error) {
        winston.error(error);
        res.status(500).send(error);
    }
})


export default router;