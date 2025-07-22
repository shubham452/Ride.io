import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials:true
}));

app.use('/api', router)

const startServer = () =>{
    db()
    app.listen(PORT,()=>{
        console.log("server is running");
    })
}
startServer();