import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
async function connectToDatabase(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to Database");
    }catch(e){
        console.log("Error Occurred While Connecting Database");
        console.log(e);
    }
}
export default {connectToDatabase}
