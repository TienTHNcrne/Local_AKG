/** @format */

import React from "react";
import styles from "./InForUser.module.scss";
import { MdAccountCircle } from "react-icons/md";
export default function InForUser({ className }) {
	return (
		<div className={className}>
			<MdAccountCircle className={styles.icon} />
			<div className={styles.item}>
				<h3>Username:</h3>
				<p>{localStorage.getItem("name")}</p>
			</div>
			<div className={styles.item}>
				<h3>Email:</h3>
				<p>{localStorage.getItem("email")}</p>
			</div>
		</div>
	);
}
