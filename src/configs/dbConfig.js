import mongoose from "mongoose";
import 'dotenv/config';

async function configureDB() {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Db Connected !");
    } catch (error) {
        console.log(error);
    }
}
export default configureDB;