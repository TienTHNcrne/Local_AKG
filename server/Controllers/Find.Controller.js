/** @format */

import { Find, TradePosToAddress } from '../services/Find.service.js';
const FL = async (req, res) => {
    try {
        const result = await Find(req.query.q);
        const bruh = [];
        result.data.map((value, id) => {
            if (!value.display_name.search('Việt Nam')) return;
            bruh.push({
                lat: value.lat,
                lng: value.lon,
                name: value.display_name,
            });
        });
        return res.status(200).json(bruh);
    } catch (err) {
        return res.status(500).json({ err: err.message });
    }
};

const TradeToAddres = async (req, res) => {
    try {
        console.log(req.body);
        const e = { lat: req.body.lat, lng: req.body.lng };
        const result = await TradePosToAddress(e);
        return res.status(result.status).json(result.data);
    } catch (err) {
        console.log(err);
    }
};
export { TradeToAddres, FL };
