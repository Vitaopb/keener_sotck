import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
import express from 'express';
import { userRouter } from './Routes/User/userRoutes';
import { productRouter } from './Routes/Product/productRoutes';
import { movimentRouter } from './Routes/Moviment/movimentRoutes';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(movimentRouter)

app.listen(port, () => console.log(`Server is running on port ${port}`));

