// seedComments.js
import mongoose from "mongoose";
import RateModel from "./Models/Rate.model.js";

// connect
await mongoose.connect(
    "mongodb+srv://tienguyen3541:ApfaMdBych5PmJUb@cluster0.zaou1fu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
);

// khoảng thời gian
const start = new Date("2025-11-08T00:00:00Z").getTime();
const end = new Date("2026-01-23T23:59:59Z").getTime();

// lấy toàn bộ rates
const docs = await RateModel.find();

for (const doc of docs) {
    const randomTime = new Date(start + Math.random() * (end - start));

    await RateModel.updateOne(
        { _id: doc._id },
        { $set: { createdAt: randomTime } },
    );
}

console.log("Đã random createdAt cho:", docs.length, "records");
process.exit();
