import mongoose, { Schema } from "mongoose";

const Events = new Schema({
    name: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
});
export default mongoose.model("Events", Events);
