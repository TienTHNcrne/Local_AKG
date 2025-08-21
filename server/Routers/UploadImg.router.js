/** @format */

import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.config.js";
import Gps from "../Models/Gps.model.js";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.array("images", 20), async (req, res) => {
    try {
        // Kiểm tra req.body.lat, req.body.lng
        const lat = Number(req.body.lat);
        const lng = Number(req.body.lng);

        if (isNaN(lat) || isNaN(lng)) {
            return res.status(400).json({ error: "Lat/Lng không hợp lệ" });
        }

        if (!req.files || req.files.length === 0) {
            return res
                .status(400)
                .json({ error: "Không có file nào được upload" });
        }

        const uploadImages = req.files.map((file) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "gps-images" },
                    (error, result) => {
                        if (result) resolve(result.secure_url);
                        else reject(error);
                    }
                );
                streamifier.createReadStream(file.buffer).pipe(stream);
            });
        });

        const imageUrls = await Promise.all(uploadImages);

        const gps = new Gps({
            lat,
            lng,
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            time: req.body.time,
            img: imageUrls,
        });

        await gps.save();
        res.status(201).json({ message: "Tạo điểm GPS thành công", gps });
    } catch (err) {
        console.error("UPLOAD ERROR:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
