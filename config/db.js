import colors  from "colors";
import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Conected To Mongodb Database ${conn.connection.host}`.bgMagenta.white);
    } catch(error) {
        console.log(`Error in MongoDB ${errror}`.bgRed.white);
    }
}

export default connectDB; 