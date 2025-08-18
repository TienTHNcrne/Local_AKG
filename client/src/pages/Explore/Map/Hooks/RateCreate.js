/** @format */

import React from "react";

import { notification } from "antd";
import axios from "axios";
export default async function RateCreate({ name, lat, lng, comment, rate }) {
	if (!localStorage.getItem("userid")) return;
	try {
		axios.post(`${import.meta.env.VITE_BE_URL}/v1/api/rate/create`, {
			name: name,
			lat: lat,
			lng: lng,
			comment: comment,
			rate: rate,
			UserId: localStorage.getItem("userid"),
		});
		notification.success({
			message: "Tạo bluan thanh cong",
		});
	} catch (Err) {
		console.log(Err);
	}
}
