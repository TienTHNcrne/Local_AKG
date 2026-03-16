import mongoose, { Schema } from "mongoose";

// ── Sub-schema thông tin chi tiết ──────────────────────
const InformationSchema = new Schema(
    {
        overview: { type: String, default: "" },
        climate: { type: String, default: "" },
        history: { type: String, default: "" },
        culture: { type: String, default: "" },
        beliefs: { type: String, default: "" },
        food: { type: String, default: "" },
        attractions: { type: String, default: "" },
        festivals: { type: String, default: "" },
    },
    { _id: false },
);

const ProvideSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        slug: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
        },
        coverImage: {
            type: String,
            default: "",
        },
        information: {
            type: InformationSchema,
            default: () => ({}),
        },
    },
    { timestamps: true },
);

export default mongoose.model("Provide", ProvideSchema);
