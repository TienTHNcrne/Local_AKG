import { CreateFestival, GetAll } from "../services/Festival.service.js";
import { Cloudinary } from "../utils/Cloudinary.js";

export const createFestivalController = async (req, res) => {
    try {
        const { name, description } = req.body;
        let imageUrls = [];
        const time = req.body.times;
        const place = req.body.places;

        if (req.files && req.files.length > 0) {
            imageUrls = await Cloudinary(req.files);
        }
        const result = await CreateFestival({
            name,
            time,
            description,
            place,
            imgs: imageUrls,
        });

        return res.status(result.status).json(result.data);
    } catch (err) {
        console.error("CREATE FESTIVAL ERROR:", err);
        return res.status(500).json({ error: err.message });
    }
};

export const getAllFestivalsController = async (req, res) => {
    try {
        const result = await GetAll();
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.error("GET FESTIVALS ERROR:", err);
        return res.status(500).json({ error: err.message });
    }
};
