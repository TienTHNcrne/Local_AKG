import mongoose, { Schema } from "mongoose";
const food = new Schema({
    general: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    smell: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    imgs: {
        type: [String],
    },
});
export default mongoose.model("food", food);
