/** @format */

import mongoose, { Schema } from "mongoose";

const Rate = new Schema({
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    imgs: {
        type: [String],
    },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Rate", Rate);
