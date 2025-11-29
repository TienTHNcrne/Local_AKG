/** @format */

import mongoose, { Schema } from "mongoose";

const PlaceLove = new Schema({
	UserId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	lat: {
		type: Number,
		required: true,
	},
	lng: {
		type: Number,
		required: true,
	},
	img: {
		type: String,
	},
});

export default mongoose.model("PlaceLove", PlaceLove);
