/** @format */

import RateModel from "../Models/Rate.model.js";

import UserModel from "../Models/user.model.js";

const Create = async ({ name, lat, lng, UserId, comment, rate }) => {
	try {
		const result = await RateModel.create({
			name: name,
			lat: lat,
			lng: lng,
			comment: comment,
			rate: rate,
			UserId: UserId,
		});
		return {
			status: 200,
			data: result,
		};
	} catch (Err) {
		console.log(Err.message);
	}
};

const GetAll = async ({ name, lat, lng }) => {
	try {
		const result = await RateModel.find({
			name: name,
			lat: lat,
			lng: lng,
		}).populate("UserId");
		return {
			status: 200,
			data: result,
		};
	} catch (Err) {
		console.log(Err.message);
	}
};

export { GetAll, Create };
