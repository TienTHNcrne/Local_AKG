/** @format */

import {
	GetAll,
	remove,
	CreatePlan,
	updateName,
} from "../services/Plan.service.js";

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
const updatePlanName = async (req, res) => {
	const result = await updateName({
		id: req.body.id,
		UserId: req.body.UserId,
		name: req.body.name,
	});
	res.status(result.status).json(result.data || { error: result.error });
};

export { removedPlan, Create, GetPlan, updatePlanName };
