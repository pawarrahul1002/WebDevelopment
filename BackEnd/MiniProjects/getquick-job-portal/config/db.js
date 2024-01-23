import mongoose from "mongoose";
// import colors from colors;
// mongodbpassword = "lEzTHlMZvmSU0CSI";
// username = "pawarrahul1002"

const connectDB = async ()=>{
    try{
        console.log("try connecting db");
        console.log(process.env.MONGO_URL);
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to MongoDB ${mongoose.connection.host}`.bgMagenta.white);
    }
    catch(error)
    {
        console.log(`MongoDB error ${error}`.bgRed.white);
    }
}

export default connectDB;