import mongoose from 'mongoose'

const connectDB = async () =>{
    try {
            const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/imagify`);
            console.log(`Database connected at host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Databse connection error", error);
        process.exit(1);
    }
}

export default connectDB;