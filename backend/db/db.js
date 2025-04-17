import mongoose from "mongoose"


export const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb Connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error DB Connection: `, error.message);
        process.exit(1)        
    }
}