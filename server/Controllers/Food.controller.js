import { GetAll, CreateFood } from "../services/Food.service.js";
import { Cloudinary } from "../utils/Cloudinary.js";

export const CreateFoodController = async (req, res) => {
    try {
        const { name, general, smell, place, price } = req.body;
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            imageUrls = await Cloudinary(req.files);
        }
        const result = await CreateFood({
            name: name,
            general: general,
            price: price,
            smell: smell,
            place: place,
            imgs: imageUrls,
        });

        return res.status(result.status).json(result.data);
    } catch (err) {
        console.error("CREATE FoodERROR:", err);
        return res.status(500).json({ error: err.message });
    }
};

export const getAllFoodController = async (req, res) => {
    try {
        const result = await GetAll();
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.error("GET Food ERROR:", err);
        return res.status(500).json({ error: err.message });
    }
};
