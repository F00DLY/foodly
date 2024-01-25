import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded.apply({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// routes

import userRouter from './routes/user.routes.js';
import restaurantRouter from './routes/Restaurant.routes.js';
import cartRouter from './routes/cart.routes.js';

//routes declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurant', restaurantRouter);
app.use('/api/v1/cart', cartRouter);

export { app };
