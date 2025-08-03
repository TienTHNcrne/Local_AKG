import mongoose, { Schema } from "mongoose";

const Gps = new Schema({
    lat: {
        type: String,
        required: true,
    },
    lng: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Gps", Gps);
