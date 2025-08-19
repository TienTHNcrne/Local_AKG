/** @format */

import React, { useState } from "react";

import styles from "./GetDesMain.module.scss";
import { IoSparklesSharp } from "react-icons/io5";
import Rate from "../InforPlace/components/Comments/Rate/Rate";
import RateCreate from "../../Hooks/RateCreate";
export default function GetDesMain({
	category,
	address,
	general,
	name,
	time,
	lat,
	lng,
	images,
	setPopup,
}) {
	const [show, setShow] = useState(false);

	return (
		<div className={styles.container}>
			{" "}
			{show && <Rate setShow={setShow} lat={lat} lng={lng} />}
			<div className={styles.content}>
				{" "}
				<div className={styles.header}>
					<button onClick={() => setPopup(false)}>&times;</button>
				</div>
				<div className={styles.body}>
					<img
						src={images[Math.floor(Math.random() * images.length)]}
						alt=''
					/>{" "}
					<div className={styles.main}>
						<div className={styles.mainContent}>
							<h2>{name}</h2> <p>{category}</p>
						</div>{" "}
						<div className={styles.mainContent}>
							<h4>Tổng quan</h4>
							<p>{general}</p>
						</div>{" "}
						<div className={styles.mainContent}>
							<h4>Địa chỉ</h4>
							<p>{address}</p>
						</div>{" "}
						<div className={styles.mainContent}>
							<h4>Thời điểm thích hợp để du lịch</h4>
							<p>{time}</p>
						</div>{" "}
					</div>
				</div>
				<div className={styles.footer}>
					<div className={styles.add}>
						<button>
							<IoSparklesSharp />
						</button>
						<p>Thêm vào mục yêu thích</p>
					</div>
					<button
						className={styles.review}
						onClick={() => setShow(true)}
					>
						Please to write a review{" "}
					</button>
				</div>
			</div>
		</div>
	);
}
