// controllers/RouterController.js
import { SetUpRouter } from "../services/SetUpRouter.service.js";

const Create = async (req, res) => {
    try {
        const coordinates = req.body.coordinates;
        const result = await SetUpRouter({
            data: coordinates,
            profile: req.body.profile,
        });
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
};

export default Create;
