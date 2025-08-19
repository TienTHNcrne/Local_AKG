/** @format */

import { GetAll, Create } from "../services/Rate.service.js";
const CreateRate = async (req, res) => {
	try {
		const lat = req.body.lat;
		const lng = req.body.lng;
		const comment = req.body.comment;
		const UserId = req.body.UserId;
		const rate = req.body.rate;
		const result = await Create({
			lat: lat,
			lng: lng,
			UserId: UserId,
			comment: comment,
			rate: rate,
		});
		return res.status(result.status).json(result.data);
	} catch (err) {
		console.error(err);
		res.status(500).json(error.message);
	}
};

const getAll = async (req, res) => {
	try {
		console.log("oke", req);
		const lat = req.query.lat;
		const lng = req.query.lng;
		const result = await GetAll({ lat: lat, lng: lng });
		return res.status(result.status).json(result.data);
	} catch (err) {
		console.error(err);
		res.status(500).json(error.message);
	}
};
export { getAll, CreateRate };
