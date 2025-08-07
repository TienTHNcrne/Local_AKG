/** @format */

import { v2 as cloudinary } from "cloudinary";

const UploadImg = async (req, res) => {
	try {
		const urls = [];

		for (const file of req.files) {
			const result = await new Promise((resolve, reject) => {
				const stream = cloudinary.uploader.upload_stream(
					{
						folder: "Place",
						transformation: [
							{ width: 800, height: 800, crop: "limit" },
						],
					},
					(error, result) => {
						if (error) return reject(error);
						resolve(result);
					}
				);

				stream.end(file.buffer);
			});

			urls.push(result.secure_url);
		}

		res.status(200).json({ urls });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Upload failed" });
	}
};

export default UploadImg;
