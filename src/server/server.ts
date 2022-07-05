import cors from 'cors';
import express from 'express';
import path from 'path';
import categoryRouter from './categoryRouter';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userRouter from './userRouter';
import winston from 'winston';

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specification));

app.use('/', express.static(path.join(__dirname, '../../static')));

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api', categoryRouter);

app.use('/api/user', userRouter);

process.on('uncaughtException', (err) => {
    console.error(err);
});

app.listen(port, () => {
    winston.log('Listen to port ', port);
    console.log(`Example app listening on port ${port}`);
});
