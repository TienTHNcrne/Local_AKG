import Gps from "../Models/GpsModel.js";
import GpsModel from "../Models/GpsModel.js";
const Gs = async (lat, lng, name) => {
    const results = Gps.create({ name, lat, lng });
    return {
        status: 200,
        data: results,
    };
};
const Fid = async (lat, lng, name) => {
    try {
        const results = Gps.findOne({ name, lat, lng });
        if (results !== null) {
            return { status: 200, data: "existed" };
        }
        return { status: 200, data: "not exist" };
    } catch (err) {
        return { status: 500, data: err };
    }
};

export { Gs, Fid };
