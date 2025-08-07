import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const HistoricAI = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        content: {
            type: [messageSchema],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("HistoricAI", HistoricAI);
