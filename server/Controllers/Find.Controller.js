/** @format */

import Find from "../services/Find.service.js";
const FL = async (req, res) => {
	try {
		const result = await Find(req.query.q);
		const bruh = [];
		result.data.map((value, id) => {
			if (!value.display_name.search("Việt Nam")) return;
			bruh.push({
				lat: value.lat,
				lng: value.lon,
				name: value.display_name,
			});
		});
		return res.status(200).json(bruh);
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};
export default FL;
