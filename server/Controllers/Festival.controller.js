import { CreateFestival, GetAll } from "../services/Festival.service.js";
import { Cloudinary } from "../utils/Cloudinary.js";

export const createFestivalController = async (req, res) => {
    try {
        const { name, time, description, place } = req.body;
        let imageUrls = [];

        // chỉ upload nếu có file
        if (req.files && req.files.length > 0) {
            imageUrls = await Cloudinary(req.files);
        }
        console.log(req.files);
        const result = await CreateFestival({
            name,
            time,
            description,
            place,
            imgs: imageUrls, // ✅ đổi đúng key với model
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
