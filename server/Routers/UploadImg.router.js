/** @format */

import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.config.js";
import Gps from "../models/Gps.model.js";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.array("images", 5), async (req, res) => {
	try {
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
			lat: req.body.lat,
			lng: req.body.lng,
			name: req.body.name,
			description: req.body.description,
			img: imageUrls,
		});

		await gps.save();

		res.status(201).json({ message: "Tạo điểm GPS thành công", gps });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
