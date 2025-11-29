/** @format */

import mongoose, { Schema } from "mongoose";

const plan = new Schema({
	UserId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	details: {
		type: String,
		required: true,
	},
});

export default mongoose.model("plan", plan);
