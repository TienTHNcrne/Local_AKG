/** @format */

import React from "react";

import { notification } from "antd";
import axios from "axios";
export default async function RateCreate({ lat, lng, comment, rate, setShow }) {
	if (!localStorage.getItem("userid")) return;
	try {
		await axios.post(`${import.meta.env.VITE_BE_URL}/v1/api/rate/create`, {
			lat: lat,
			lng: lng,
			comment: comment,
			rate: rate,
			UserId: localStorage.getItem("userid"),
		});
		notification.success({
			message: "Tạo bluan thanh cong",
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
