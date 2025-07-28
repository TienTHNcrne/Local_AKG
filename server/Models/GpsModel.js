import mongoose, { Schema } from "mongoose";

const GpsSchema = new Schema({
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Gps", Gps);
