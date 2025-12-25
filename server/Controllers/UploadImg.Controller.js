/** @format */

import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const UploadImg = async (req, res) => {
	try {
		const uploads = await Promise.all(
			req.files.map((file) => {
				return new Promise((resolve, reject) => {
					const stream = cloudinary.uploader.upload_stream(
						{ folder: "your-folder-name" },
						(err, result) => {
							if (err) reject(err);
							else resolve(result.secure_url);
						}
					);
					streamifier.createReadStream(file.buffer).pipe(stream);
				});
			})
		);

		res.json({ urls: uploads });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Upload failed" });
	}
};
