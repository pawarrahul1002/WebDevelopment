import mongoose from "mongoose";
// uri: string
export const connectDB = () => {
    mongoose
        .connect("mongodb://127.0.0.1:27017/Ecommerce_24")
        .then((c) => console.log(`DB Connected to ${c.connection.host}`))
        .catch((e) => console.log(e));
};
