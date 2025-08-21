/** @format */

import axios from "axios";
import { notification } from "antd";

export default async function Create(
    center,
    search,
    description,
    category,
    AddNewLocal,
    images,
    time
) {
    try {
        const formData = new FormData();
        formData.append("lat", center.lat);
        formData.append("lng", center.lng);
        formData.append("name", search);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("time", time);
        if (Array.isArray(images)) {
            images.forEach((img) => {
                formData.append("images", img.File);
            });
        }
        console.log(center.lat, " ", center.lng);
        await axios
            .post(`${import.meta.env.VITE_BE_URL}/v2/api/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                console.log("oke");
                notification.success({
                    message: "Tạo địa điểm thành công",
                    description: "Địa điểm mới đã được thêm vào bản đồ.",
                });
            })
            .catch((err) => {
                console.log("không tải được", err);
            });

        AddNewLocal();
    } catch (err) {
        console.error("UPLOAD FAIL:", err.response?.data || err.message);
    }
}
