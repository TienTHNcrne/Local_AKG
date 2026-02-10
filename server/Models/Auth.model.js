import mongoose from "mongoose";

const users = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
    },
    filter: {
        type: String,
        required: true,
    },

    provider: {
        type: String,
        default: "local",
    },
    googleId: {
        type: String,
    },
});

export default mongoose.model("users", users);
