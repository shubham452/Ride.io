import mongoose from 'mongoose';

export const db = async()=>{
    try{
        mongoose.set('strictQuery',false);
        await mongoose.connect(process.env.MONGO_URI)
        console.log('DB connection successful');
    } catch(error){
        console.log('DB connection failed', error)
    }
}