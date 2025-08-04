import { Gs, Fid } from "../services/GpsService.js";
const Gps = async (req, res) => {
    try {
        const data = await Gs({
            name: req.query.name,
            lat: req.query.lat,
            lng: req.query.lng,
            description: req.query.description,
        });
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
