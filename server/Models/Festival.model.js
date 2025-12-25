import mongoose, { Schema } from "mongoose";
const festival = new Schema({
    time: {
        type: [String],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    place: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgs: {
        type: [String],
    },
});
export default mongoose.model("festival", festival);
