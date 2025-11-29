/** @format */
import { Cloudinary } from "../utils/Cloudinary.js";

import { GetAll, Create } from "../services/Rate.service.js";
const CreateRate = async (req, res) => {
    try {
        const { lat, lng, comment, rate, UserId } = req.body;

        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            imageUrls = await Cloudinary(req.files);
        }
        const result = await Create({
            lat: lat,
            lng: lng,
            UserId: UserId,
            comment: comment,
            rate: rate,
            imgs: imageUrls,
        });
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.error(err);
        res.status(500).json(error.message);
    }
};

const getAll = async (req, res) => {
    try {
        console.log("oke", req);
        const lat = req.query.lat;
        const lng = req.query.lng;
        const result = await GetAll({ lat: lat, lng: lng });
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.error(err);
        res.status(500).json(error.message);
    }
};
export { getAll, CreateRate };
