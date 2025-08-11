/** @format */
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Home.module.scss";
export default function Home() {
	const [forecast, setForecast] = useState(null);
	const [current, setCurrent] = useState(null);
	const [center, setCenter] = useState({ lat: null, lng: null });

	const [details, setDetails] = useState(null);
	center.lat = 10.3903537;
	center.lng = 105.4344389;
	useEffect(() => {
		const fetchWeather = async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_BE_URL}/v2/api/weather`,
					{
						params: {
							lat: center.lat,
							lng: center.lng,
						},
					}
				);
				console.log(res.data);

				setForecast(res.data.forecast.forecastday);
				setCurrent(res.data.current);
			} catch (err) {
				console.log("Don't connect weather", err.message);
			}
		};

		if (center?.lat && center?.lng) {
			fetchWeather();
		}
	}, [center]);
	const getD = (dateString) => {
		const days = [
			"Chủ Nhật",
			"Thứ Hai",
			"Thứ Ba",
			"Thứ Tư",
			"Thứ Năm",
			"Thứ Sáu",
			"Thứ Bảy",
		];
		const date = new Date(dateString);
		return days[date.getDay()];
	};
	console.log(details);
	return (
		<>
			{current && (
				<div className={styles.container}>
					<div className={styles.ro1}>
						<h2>Thoi tiet hien tai</h2>

						<div className={styles.current}>
							<div className={styles.basicInfor}>
								<div className={styles.col1}>
									<img
										src={current.condition.icon}
										alt='khong co'
									/>
									<div className={styles.temp}>
										<h3>{current.temp_c}C</h3>
										<h3>{current.temp_f}F</h3>{" "}
									</div>
								</div>
								<div className={styles.col2}>
									<p>Độ ẩm: {current.humidity}%</p>
									<p>Mưa: {current.precip_mm} mm</p>
									<p>Gió: {current.wind_kph} km/h</p>
									<p>
										Cập nhật:{" "}
										{current.last_updated.split(" ")[1]}
									</p>
								</div>
							</div>
							<div className={styles.date}>
								<h3>{getD(`${forecast[0].date}`)}</h3>
								<h4> {forecast[0].date}</h4>
								<p> {current.condition.text}</p>
							</div>
						</div>
					</div>
					{/*FORECAST 5 DAY */}
					<div className={styles.ro2}>
						<h2>Du bao 5 ngay toi </h2>
						<div className={styles.content}>
							{forecast.map((value, id) => (
								<div className={styles.general}>
									<div className={styles.infor}>
										<div className={styles.right}>
											{" "}
											<h3>{getD(`${value.date}`)}</h3>
											<h4> {value.date}</h4>
											<img
												src={value.day.condition.icon}
												alt='error img'
											/>
											<p>{value.day.condition.text}</p>
										</div>
										<div className={styles.left}>
											{" "}
											{/*REVIEWS */}
											<p>
												Nhiet do to da:{" "}
												{value.day.maxtemp_c}C{" "}
												{value.day.maxtemp_f}F
											</p>
											<p>
												Toc do gio toi da:{" "}
												{value.day.maxwind_kph}
												km/h
											</p>
											<p>
												Đổ ẩm: {value.day.avghumidity}%
											</p>
											<p>Chỉ số UV: {value.day.uv}</p>
											<button
												onClick={() => setDetails(id)}
											>
												details
											</button>
										</div>{" "}
									</div>
									{details === id && (
										<div className={styles.hours}>
											{value.hour.map((val, id) => (
												<div
													key={id}
													className={styles.hour}
												>
													<h3>
														{val.time.split(" ")[1]}
													</h3>
													<img
														src={val.condition.icon}
														alt=''
													/>
													<p>{val.condition.text}</p>
												</div>
											))}
										</div>
									)}
								</div>
							))}{" "}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
