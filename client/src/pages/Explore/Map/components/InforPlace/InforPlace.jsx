/** @format */
import React, { useEffect, useState } from "react";
import styles from "./InforPlace.module.scss";
import General from "./components/General/General";
import axios from "axios";
import Comments from "./components/Comments/Comments";
import Weather from "./components/Weather/Weather";
export default function InForPlace({ center, popup, inFor }) {
	const MainName = inFor?.name?.split(",")[0];
	const images = Array.isArray(inFor?.img) ? inFor.img : [];
	const [choose, setChoose] = useState("general");
	return (
		<div
			className={`${styles.container} ${
				popup ? styles.open : styles.close
			}`}
		>
			<div className={styles.header}>
				<div className={styles.images}>
					{images.length > 0 &&
						images.map((value, id) => (
							<img src={value} alt={`Ảnh ${id + 1}`} key={id} />
						))}
				</div>
				<h1>{MainName}</h1>
				<p>{inFor.category}</p>
				<div className={styles.option}>
					<div className={styles.general}>
						<h4
							className={
								choose === "general" ? styles.processing : ""
							}
							onClick={() => {
								setChoose("general");
							}}
						>
							General{" "}
						</h4>
					</div>{" "}
					<div className={styles.weather}>
						<h4
							className={
								choose === "weather" ? styles.processing : ""
							}
							onClick={() => {
								setChoose("weather");
							}}
						>
							Weather
						</h4>
					</div>
					<div className={styles.rate}>
						<h4
							className={
								choose === "rate" ? styles.processing : ""
							}
							onClick={() => {
								setChoose("rate");
							}}
						>
							Appreciate
						</h4>
					</div>
				</div>
			</div>
			<div className={styles.content}>
				{choose === "general" && (
					<General
						description={inFor.description}
						address={inFor.name}
					/>
				)}
				{choose === "rate" && <Comments />}
				{choose === "weather" && <Weather center={center} />}
			</div>
		</div>
	);
}
