import express from "express";

const userRouter = express.Router();

userRouter.post("/user", (req, res) => {
    const { username, password } = req.body;
    res.send(123)
})

export default userRouter;