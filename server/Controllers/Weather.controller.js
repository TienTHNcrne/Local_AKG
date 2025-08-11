/** @format */
import weather from "../services/Weather.service.js";
const wether = async (req, res) => {
	const lat = req.query.lat;
	const lng = req.query.lng;
	const result = await weather(lat, lng);
	return res.json(result);
};
export default wether;
