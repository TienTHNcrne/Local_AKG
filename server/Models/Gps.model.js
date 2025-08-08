/** @format */

import mongoose, { Schema } from "mongoose";

const Gps = new Schema({
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
	territory: {
		type: String,
		required: true,
	},
	img: {
		type: [String],
	},
});

export default mongoose.models.Gps || mongoose.model("Gps", Gps);
