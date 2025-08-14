/** @format */

import { GetAll, remove, CreatePlan } from "../services/Plan.service.js";

const Create = async (req, res) => {
	try {
		const UserId = req.body.UserId;
		const name = req.body.name;
		const details = req.body.details;

		const result = await CreatePlan({
			UserId: UserId,
			name: name,
			details: details,
		});
		return res.status(result.status).json(result.data);
	} catch (err) {
		console.log(err.message);
	}
};

const GetPlan = async (req, res) => {
	try {
		const UserId = req.body.UserId;
		const result = await GetAll({
			UserId: UserId,
		});
		return res.status(result.status).json(result.data);
	} catch (err) {
		console.log(err.message);
	}
};

const removedPlan = async (req, res) => {
	try {
		const UserId = req.body.UserId;
		const name = req.body.name;
		const details = req.body.details;

		const result = await remove({
			UserId: UserId,
			name: name,
			details: details,
		});
		return res.status(result.status).json(result.data);
	} catch (err) {
		console.log(err.message);
	}
};

export { removedPlan, Create, GetPlan };
