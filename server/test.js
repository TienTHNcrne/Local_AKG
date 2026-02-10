import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGO_DB_URL;

console.log("MongoDB URI:", uri);
mongoose
    .connect(uri)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => console.error("❌ MongoDB error:", err.message));
export default mongoose;
