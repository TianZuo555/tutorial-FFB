import cors from 'cors';
import express from 'express';
import path from 'path';
import router from './router';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userRouter from './user';

const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce API',
            version: '1.0.0',
        },
    },
    apis: ['src/server/*.ts'], // files containing annotations as above
};

const port = process.env.PORT || 8000;

const specification = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specification));

app.use("/",express.static(path.join(__dirname,"../../static")));

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", router)
app.use("/api", userRouter)

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
