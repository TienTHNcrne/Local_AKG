/** @format */

import PlaceLoveModel from "../Models/PlaceLove.model.js";
const CreatePlaceLove = async ({ UserId, name, lat, lng, img }) => {
	try {
		const result = await PlaceLoveModel.create({
			UserId: UserId,
			name: name,
			lat: lat,
			lng: lng,
			img: img,
		});
		return {
			status: 200,
			data: result,
		};
	} catch (err) {
		console.log(err.message);

		return { status: 501, data: err.message };
	}
};
//
const FindPlace = async ({ UserId, name, lat, lng }) => {
	try {
		const result = await PlaceLoveModel.findOne({
			UserId: UserId,
			name: name,
			lat: lat,
			lng: lng,
		});
		if (result)
			return {
				status: 200,
				data: "PlaceLove",
			};
		return { status: 200, data: "NoPlaceLove" };
	} catch (err) {
		console.log(err.message);
		return { status: 501, data: err.message };
	}
};
//
const FindAllPlace = async ({ UserId }) => {
	try {
		const result = await PlaceLoveModel.find({ UserId: UserId });
		return {
			status: 200,
			data: result,
		};
	} catch (err) {
		console.log(err.message);
		return { status: 501, data: err.message };
	}
};
//
const removePlace = async ({ UserId, name, lat, lng }) => {
	try {
		const result = await PlaceLoveModel.deleteOne({
			UserId: UserId,
			name: name,
			lat: lat,
			lng: lng,
		});
		if (result.deletedCount)
			return {
				status: 200,
				data: "removedPlace",
			};
		return { status: 200, data: "NotFound" };
	} catch (err) {
		console.log(err.message);
		return { status: 501, data: err.message };
	}
};
export { CreatePlaceLove, FindPlace, FindAllPlace, removePlace };
