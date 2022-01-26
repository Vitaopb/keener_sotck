import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
import express from 'express';
import { userRouter } from './Routes/User/userRoutes';
import { productRoutes } from './Routes/Product/productRoutes';

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(productRoutes);

app.listen(3333, console.log('Server started on port 3333'));