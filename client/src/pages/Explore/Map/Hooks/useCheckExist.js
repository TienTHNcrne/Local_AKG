/** @format */

import React, { useState, useEffect } from "react";

import axios from "axios";
export default function useCheckExist(center, search) {
	const [exist, setExist] = useState(false);
	useEffect(() => {
		if (!center.lat || !center.lng || !search) return;

		axios
			.get(`${import.meta.env.VITE_BE_URL}/v1/api/gps/find`, {
				params: {
					lat: center.lat,
					lng: center.lng,
					name: search,
				},
			})

			.then((res) => {
				console.log(res.data.data);
				if (res.data.data === "existed") setExist(true);
				else setExist(false);
			})
			.catch((err) => console.error("Lỗi kiểm tra toạ độ:", err));
	}, [center, search]);
	return exist;
}
