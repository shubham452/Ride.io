import mongoose from 'mongoose';

export const db = async()=>{
    try{
        monsoose.set('strictQuery',false);
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB connection successful');
    } catch(error){
        console.log('DB connection failed', error)
    }
}