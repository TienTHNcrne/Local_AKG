/** @format */
import { Remove } from '../services/Check.service.js';
import CheckModel from '../Models/Check.model.js';
const getAll = async (req, res) => {
    try {
        const data = await CheckModel.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const RemoveE = async (req, res) => {
    try {
        const data = await Remove({ lat: req.body.lat, lng: req.body.lng });
        res.status(200).json(data.message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { getAll, RemoveE };
