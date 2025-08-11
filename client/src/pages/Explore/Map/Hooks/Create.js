/** @format */

import axios from "axios";
import { notification } from "antd";

export default async function Create(
	center,
	search,
	description,
	category,
	AddNewLocal,
	images
) {
	try {
		const formData = new FormData();
		formData.append("lat", center.lat);
		formData.append("lng", center.lng);
		formData.append("name", search);
		formData.append("description", description);
		formData.append("category", category);

		// Append từng ảnh
		if (Array.isArray(images)) {
			images.forEach((img) => {
				console.log(img.File);
				formData.append("images", img.File);
			});
		}

		await axios.post(
			`${import.meta.env.VITE_BE_URL}/v2/api/upload`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		notification.success({
			message: "Tạo địa điểm thành công",
			description: "Địa điểm mới đã được thêm vào bản đồ.",
		});

		AddNewLocal(); // Nếu bạn cần reload map hay danh sách
	} catch (err) {
		console.error("UPLOAD FAIL:", err.response?.data || err.message);
	}
}
