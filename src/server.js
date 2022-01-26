import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
import express from 'express';
import { userRouter } from './Routes/UserRoutes/userRoutes';
const app = express();

app.use(express.json());
app.use(userRouter);

app.listen(3333, console.log('Server started on port 3333'));