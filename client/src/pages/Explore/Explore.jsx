/** @format */

import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import styles from "./Explore.module.scss";
import GetDesMain from "./Map/components/GetDesMain/GetDesMain";
export default function Explore() {
	const [data, setData] = useState([]);
	const [dataCard, setDataCard] = useState(null);
	const [popup, setPopup] = useState(false);
	useEffect(() => {
		try {
			axios
				.get(`${import.meta.env.VITE_BE_URL}/v1/api/gps/all`)
				.then((res) => {
					console.log(res.data);
					setData(res.data);
				})
				.catch((err) => console.log(err.message));
		} catch (err) {
			console.log(err);
		}
	}, []);
	const getAddress = (s) => {
		let a = s.split(",");
		let address = "";
		for (let i = 1; i !== a.length - 1; ++i) {
			address += a[i] + (i < a.length - 2 ? "," : "");
		}
		return address;
	};
	return (
		<div className={styles.container}>
			{popup && (
				<GetDesMain
					name={dataCard.name.split(",")[0]}
					time={dataCard.time}
					category={dataCard.category}
					address={getAddress(dataCard.name)}
					general={dataCard.description}
					images={dataCard.img}
					lat={dataCard.lat}
					lng={dataCard.lng}
					setPopup={setPopup}
				/>
			)}
			<div className={styles.header}>
				<div className={styles.first}>
					<button>
						<h4>Địa điểm </h4>
					</button>
					<button>
						<h4>Món ăn </h4>
					</button>
					<button>
						<h4>Sự kiện </h4>
					</button>
				</div>
				<div className={styles.second}>
					<input type='text' />
					<div className={styles.filter}>
						<select name='filter'>
							<option value='All'>All</option>
							<option value='mountain'>Núi</option>

							<option value='lake'>Hồ</option>
						</select>
					</div>
				</div>
			</div>
			<div className={styles.cards}>
				{data.map((value, id) => (
					<div
						className={styles.card}
						key={id}
						onClick={() => {
							setDataCard(value);
							setPopup(true);
						}}
					>
						<img
							src={
								value.img[
									Math.floor(Math.random() * value.img.length)
								]
							}
							alt=''
						/>{" "}
						<h4>{value.name.split(",")[0]}</h4>
						<h5>{value.category}</h5>
						<p>{getAddress(value.name)}</p>
					</div>
				))}
			</div>
		</div>
	);
}
