import mongoose from "mongoose";


const url = "mongodb://127.0.0.1:27017/employeereviewsystem";

const connectToMongoDB = async () =>{
    try{
        await mongoose.connect(url);
        console.log("connected to mongodb");
    }
    catch(error)
    {
        console.log('database connection is failed');
        console.log(error);
        process.exit(1);
    }
}
export default connectToMongoDB;