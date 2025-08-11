/** @format */

import React, { useEffect, useState } from "react";
import { RiMapPinFill } from "react-icons/ri";
import styles from "./general.module.scss";
import { FaHeart } from "react-icons/fa6";
import { MdGpsFixed } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { FaDirections } from "react-icons/fa";
export default function general({ description, address }) {
	const aress = address ? address.split(",") : [];
	let addres = "";
	for (var i = 1; i < aress.length - 1; ++i) {
		addres += aress[i].trim() + (i < aress.length - 2 ? "," : "");
	}
	return (
		<div className={styles.container}>
			<div className={styles.option}>
				<FaDirections />
				<FaHeart />
				<MdGpsFixed />
				<IoShareSocial />
			</div>
			<div className={styles.inFor}>
				<div className={styles.address}>
					<h3>Địa chỉ</h3>
					<p>{addres}</p>
				</div>
				<div className={styles.description}>
					<h3>Thông tin cơ bản</h3>
					<p>{description}</p>
				</div>{" "}
			</div>
		</div>
	);
}
