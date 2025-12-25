/** @format */

import { Gs, Fid } from "../services/Gps.service.js";

import gps from "../Models/Gps.model.js";
const Gps = async (req, res) => {
	try {
		const data = await Gs({
			name: req.body.name,
			lat: req.body.lat,
			lng: req.body.lng,
			category: req.body.category,
			description: req.body.description,
			time: req.body.time,
		});

		return res.status(data.status).json(data.data);
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
