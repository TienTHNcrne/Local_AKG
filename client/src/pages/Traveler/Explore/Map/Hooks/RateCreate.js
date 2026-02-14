/** @format */

import React from "react";

import { notification } from "antd";
import axios from "axios";
export default async function RateCreate({
    lat,
    lng,
    comment,
    rate,
    setShow,
    imgs,
}) {
    if (!localStorage.getItem("userid")) return;
    try {
        console.log(imgs);
        console.log(lat, " ", lng, " ", comment, " ", rate);
        const formData = new FormData();
        formData.append("lat", lat);
        formData.append("lng", lng);
        formData.append("rate", rate);
        formData.append("comment", comment);
        formData.append("UserId", localStorage.getItem("userid"));

        imgs.forEach((img) => formData.append("imgs", img.File));

        await axios.post(
            `${import.meta.env.VITE_BE_URL}/v1/api/rate/create`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        notification.success({
            message: "Tạo bình luận thành công",
        });
        setShow(false);
    } catch (Err) {
        console.log(Err);
        notification.error({
            message: "Có lỗi khi gửi đánh giá",
            description: Err.response?.data?.message || Err.message,
        });
    }
}
