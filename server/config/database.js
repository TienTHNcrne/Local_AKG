import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbState = [
    { value: 0, label: "🔴 Disconnected" },
    { value: 1, label: "🟡 Connecting" },
    { value: 2, label: "🟢 Connected" },
    { value: 3, label: "🟠 Disconnecting" },
];

// Kết nối database
const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);

        const state = Number(mongoose.connection.readyState);
        const status = dbState.find((f) => f.value === state);

        console.log(status?.label || "Unknown DB state", "to con");
    } catch (err) {
        console.error("❌ Error connecting to DB:", err.message);
    }
};

export default connection;
