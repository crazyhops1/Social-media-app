import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import dbConnection from './database/database.js';
import cors from 'cors';
import authRouter from './router/auth.router.js';
import userRouter from './router/user.router.js';
import postRouter from './router/post.router.js';
import messageRouter from './router/message.router.js';
import { app, server } from './socket/socket.js';
import path from 'path';

// CORS Setup
const corsOptions = {
    origin: process.env.FRONTEND,
    credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/message', messageRouter);

// Production Static Files
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, 'frontend', 'dist', 'index.html'));
    
    });
} else {
    app.get('/', (req, res) => {
        res.send('API running');
    });
}

// Start Server
server.listen(process.env.PORT, async (e) => {
    if (e) {
        console.error('Error starting server:', e);
        return;
    }
    console.log('Server running on port', process.env.PORT);
    try {
        await dbConnection();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
    }
});
