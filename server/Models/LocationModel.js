import mongoose from "mongoose";
const location = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    content: {
        type: Object,
        required: true,
    },
    images: [String],

    center: {
        type: {
            type: String,
            enum: ["Pointer"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
});

export default mongoose.model("location", location);
