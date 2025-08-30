import { SetUpRouter } from "../services/SetUpRouter.service.js";
const Create = async (req, res) => {
    try {
        console.log(req.body);
        const coordinates = req.body.coordinates;
        const result = await SetUpRouter({ data: coordinates });
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err);
    }
};

export default Create;
