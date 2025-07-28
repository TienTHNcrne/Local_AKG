import Find from "../services/FindService.js";
const FL = async (req, res) => {
    try {
        const result = await Find(req.query.q);
        const bruh = [];
        result.data.map((value, id) => {
            bruh.push({
                lat: value.lat,
                lng: value.lon,
                name: value.display_name,
            });
        });
        res.json(bruh);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};
export default FL;
