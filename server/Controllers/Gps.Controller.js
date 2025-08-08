/** @format */

import { Gs, Fid } from "../services/GpsService.js";

import gps from "../Models/Gps.model.js";
const Gps = async (req, res) => {
	console.log(req.body);
	try {
		const data = await Gs({
			name: req.body.name,
			lat: req.body.lat,
			lng: req.body.lng,
			territory: req.body.territory,
			description: req.body.description,
		});
		return res.status(200).json(data.data);
	} catch (err) {
		return res.status(500).json(err.message);
	}
};
const GpsFind = async (req, res) => {
	try {
		const data = await Fid(req.query.lat, req.query.lng, req.query.name);
		return res.status(200).json(data);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const getAll = async (req, res) => {
	try {
		const data = await gps.find();
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
export { Gps, GpsFind, getAll };
