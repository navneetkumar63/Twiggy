import mongoose from "mongoose"
import 'dotenv/config';

const connectDB = async () =>{

mongoose.connection.on('connected',()=> console.log("Database is connected"))





await mongoose.connect(`${process.env.MONGODB_URI}`)
}

export default connectDB
 // mongodb+srv://navneetkumar991713:Kanika@99@cluster0.filykyz.mongodb.net/food-del
 
//mongodb+srv://shyambabujayswal:7084721408@cluster0.lvcoj.mongodb.net/tomato