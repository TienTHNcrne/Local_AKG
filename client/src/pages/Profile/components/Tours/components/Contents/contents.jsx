/** @format */

import React from "react";
import ReactMarkdown from "react-markdown";

import styles from "./contents.module.scss";
export default function Contents({ name, details, setShow }) {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.title}>
					<div className={styles.head}>
						<h3>{name}</h3>
						<button onClick={() => setShow(false)}> &times;</button>
					</div>
				</div>
				<div className={styles.markdown}>
					<ReactMarkdown>{details}</ReactMarkdown>
				</div>
			</div>
		</div>
	);
}
