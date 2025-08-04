import Gps from "../Models/GpsModel.js";
import GpsModel from "../Models/GpsModel.js";
const Gs = async (lat, lng, name, description) => {
    const results = Gps.create({ name, description, lat, lng });
    return {
        status: 200,
        data: "New Local",
    };
};
const Fid = async (lat, lng, name) => {
    try {
        const results = await Gps.findOne({ name, lat, lng });
        console.log(results);
        if (results !== null) {
            return { status: 200, data: "existed" };
        }
        return { status: 200, data: "not exist" };
    } catch (err) {
        return { status: 500, data: err };
    }
};

export { Gs, Fid };
