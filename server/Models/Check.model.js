import mongoose, { Schema } from "mongoose";
const details =  new Schema({
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
    description: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    img: {
        type: [String],
    },
});

const Check = new Schema({
    allow :{
        type: [details],
        default: [],
    }
})
export default mongoose.model("Check", Check);
