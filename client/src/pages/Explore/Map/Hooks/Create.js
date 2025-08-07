import React from "react";
import axios from "axios";
import { notification } from "antd";
export default async function Create(center, search, description, AddNewLocal) {
    try {
        console.log(center);
        console.log(description);

        console.log(search);
        await axios.post(`${import.meta.env.VITE_BE_URL}/v1/api/gps`, {
            params: {
                lat: center.lat,
                lng: center.lng,
                name: search,
                description: description,
            },
        });

        notification.success({
            message: "Tạo địa điểm thành công",
            description: "Địa điểm mới đã được thêm vào bản đồ.",
        });
        console.log("oke");
        AddNewLocal();
    } catch (err) {
        console.error(err.message);
    }
}
