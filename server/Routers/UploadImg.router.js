/** @format */

import express from 'express';
import multer from 'multer';
import Gps from '../Models/Gps.model.js';
import { Cloudinary } from '../utils/Cloudinary.js';
import { CheckList } from '../services/Check.service.js';
const router = express.Router();
const upload = multer();
router.post('/upload', upload.array('images', 20), async (req, res) => {
    try {
        const lat = Number(req.body.lat);
        const lng = Number(req.body.lng);

        if (isNaN(lat) || isNaN(lng)) {
            return res.status(400).json({ error: 'Lat/Lng không hợp lệ' });
        }

        let imageUrls = [];

        // chỉ upload nếu có file
        if (req.files && req.files.length > 0) {
            imageUrls = await Cloudinary(req.files);
        }
        console.log('category', req);
        const check = await CheckList({
            lat,
            lng,
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            time: req.body.time,
            img: imageUrls,
        });

        console.log(check);
        if (check.status === 200) {
            const gps = new Gps({
                lat,
                lng,
                name: req.body.name,
                category: req.body.category,
                description: req.body.description,
                time: req.body.time,
                img: imageUrls,
            });
            console.log('checkL', await gps.save());

            res.status(201).json({ message: 'Tạo điểm GPS thành công', gps });
        } else res.status(200).json({ message: 'ER' });
    } catch (err) {
        console.error('UPLOAD ERROR:', err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
