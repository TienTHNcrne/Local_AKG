import mongoose from "mongoose";
const KeyLocation = new mongoose.Schema({
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    key: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("KeyLocation", KeyLocation);
