/** @format */
import { CurCache, SumCache } from "../services/Weather.service.js";
const wetherCur = async (req, res) => {
    try {
        const lat = req.query.lat;
        const lng = req.query.lng;
        console.log(req.query);
        const result = await CurCache(lat, lng);
        return res.json(result);
    } catch (err) {
        console.log(err);
        return res.json(err.message);
    }
};
const weatherSum = async (req, res) => {
    try {
        const lat = req.query.lat;
        const lng = req.query.lng;
        const result = await SumCache(lat, lng);
        return res.json(result);
    } catch (err) {
        console.log(err);
        return res.json(err.message);
    }
};
export { weatherSum, wetherCur };
