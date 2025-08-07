/** @format */

import { Gs, Fid } from "../services/GpsService.js";

import gps from "../Models/Gps.model.js";
const Gps = async (req, res) => {
	try {
		console.log(req.body.params);
		const data = await Gs({
			name: req.body.params.name,
			lat: req.body.params.lat,
			lng: req.body.params.lng,
			description: req.body.params.description,
		});
		return res.status(200).json(data.data);
	} catch (err) {
		return res.status(500).json(err);
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
