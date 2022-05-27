import eCommerceDataBase from '../db/eCommerceDB';
import express from 'express'
import { nanoid } from 'nanoid';
const router = express.Router();
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
    res.send("test");
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
    res.send("success");
})

/**
 * @openapi
 * /api/category:
 *   post:
 *     description: Create a new category
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in : body
 *        name : category
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
router.post("/category", async (req, res) => {
    const db = new eCommerceDataBase();
    const { name } = req.body;
    const id = nanoid();
    await db.writeCategoryToDB({ id, name });
    res.send({ id, name });
})


export default router;