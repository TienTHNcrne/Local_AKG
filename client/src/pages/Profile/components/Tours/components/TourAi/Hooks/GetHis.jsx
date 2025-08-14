/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GetHis() {
	const [save, setSave] = useState([]);
	useEffect(() => {
		if (!localStorage.getItem("userid")) return;
		axios
			.post(`${import.meta.env.VITE_BE_URL}/v1/api/historicTour`, {
				userId: localStorage.getItem("userid"),
			})
			.then((res) => {
				setSave(res.data);
			})
			.catch((err) => console.error("Lỗi API:", err));
	}, []);
	return [save, setSave];
}
