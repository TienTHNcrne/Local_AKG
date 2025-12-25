/** @format */

import mongoose, { Schema } from 'mongoose';
const Check = new Schema({
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
    status: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Check', Check);
