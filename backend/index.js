import dotenv from 'dotenv';
dotenv.config(); // ✅ LOADS FIRST

import express from 'express';
import cors from 'cors';
import router from './routes/route.js';
import { db } from './db/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));

app.use('/api', router);

const startServer = () => {
    db();
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    });
};

startServer();
