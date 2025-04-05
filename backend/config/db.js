import mongoose from "mongoose"
import 'dotenv/config';

const connectDB = async () =>{

mongoose.connection.on('connected',()=> console.log("Database is connected"))





await mongoose.connect(`${process.env.MONGODB_URI}`)
}

export default connectDB
