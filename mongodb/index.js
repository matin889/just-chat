
import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true)

    if(isConnected) {
        console.log("Db is already connected")
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "JustChat",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;

        console.log("DB is connected successfully");
    } catch (error) {
        console.log(error)
    }

}