/** @format */

import Gps from "../Models/Gps.model.js";
import GpsModel from "../Models/Gps.model.js";
const Gs = async ({ lat, lng, name, category, description, time }) => {
    try {
        const results = await Gps.create({
            name,
            description,
            lat,
            category,
            time,
            lng,
        });
        return {
            status: 200,
            data: results,
        };
    } catch (err) {
        return { status: 500, data: err };
    }
};
const Fid = async (lat, lng, name) => {
    try {
        const results = await Gps.findOne({ name, lat, lng });
        if (results !== null) {
            return { status: 200, data: "existed" };
        }
        return { status: 200, data: "not exist" };
    } catch (err) {
        return { status: 500, data: err };
    }
};

export { Gs, Fid };
