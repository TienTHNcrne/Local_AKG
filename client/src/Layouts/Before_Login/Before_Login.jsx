/** @format */

import React from "react";
import BeforeLogin from "../../components/Header/BeforeLogin/BeforeLogin";
import AfterLogin from "../../components/Header/AfterLogin/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./Before_Login.module.scss";
import AI from "../../components/AI/AI";
import { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/Auth/Auth";

export default function Before_Login({ children }) {
	const { userId } = useAuth();

	return (
		<div className={styles.wrapper}>
			{userId ? (
				<AfterLogin />
			) : (
				<BeforeLogin className={styles.header} />
			)}
			<div className={styles.extra}>
				<AI />
			</div>
			<div className={styles.content}>{children}</div>
			<Footer className={styles.footer} />
		</div>
	);
}
