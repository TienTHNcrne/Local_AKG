/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GetPlace(userId) {
	const [lovePlaces, setLovePlaces] = useState([]);

	useEffect(() => {
		try {
			axios
				.post(`${import.meta.env.VITE_BE_URL}/v1/api/place/GetAll`, {
					UserId: userId,
				})
				.then((res) => {
					setLovePlaces(res.data);
				});
		} catch (err) {
			console.log(err.message);
		}
	}, [userId]);
	return lovePlaces;
}
