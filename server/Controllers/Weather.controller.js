/** @format */
import weather from "../services/Weather.service.js";
const wether = async (req, res) => {
	try {
		const lat = req.query.lat;
		const lng = req.query.lng;
		const result = await weather(lat, lng);
		return res.json(result);
	} catch (err) {
		console.log(err);
		return res.json(err.message);
	}
};
export default wether;
