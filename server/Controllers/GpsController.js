import { Gs, Fid } from "../services/GpsService.js";
const Gps = async (req, res) => {
    try {
        const data = await Gs(req.query.lat, req.query.lng, req.query.name);
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const GpsFind = async (req, res) => {
    try {
        const data = await Fid(req.query.lat, req.query.lng, req.query.name);
        console.log(data);
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err);
    }
};
export { Gps, GpsFind };
