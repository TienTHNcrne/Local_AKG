/** @format */

import React, { useState } from "react";
import styles from "./Rate.module.scss";
import { FaStar } from "react-icons/fa6";
import UpImg from "../../../../../../../../components/UpImg/UpImg";
import { notification } from "antd";
export default function Rate({ setShow }) {
	const [mark, setMark] = useState(0);
	const [img, setImg] = useState([]);
	const [rate, setRate] = useState(0);
	const [describe, setDescribe] = useState("");
	const autoResize = (e) => {
		e.target.style.height = "auto";
		e.target.style.height = e.target.scrollHeight + "px";
	};
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.star}>
					{[1, 2, 3, 4, 5].map((star) => (
						<span
							style={{
								cursor: "pointer",
								color:
									(mark || rate) >= star ? "yellow" : "#ccc",
							}}
							onMouseEnter={() => setMark(star)}
							onMouseLeave={() => setMark(0)}
							onClick={() => setRate(star)}
						>
							<FaStar />
						</span>
					))}
				</div>
				<div className={styles.inFor}>
					<textarea
						className={styles.text}
						type='text'
						placeholder='Please describe your feeling'
						onInput={autoResize}
						rows={1}
						value={describe}
						onChange={(e) => {
							setDescribe(e.target.value);
						}}
					/>
					<UpImg setImages={setImg} />
				</div>
				<div className={styles.confirm}>
					<button
						type='submit'
						className={styles.cancel}
						onClick={() => setShow(false)}
					>
						Cancel
					</button>
					<button
						className={styles.submit}
						type='submit'
						onClick={() => {
							if (rate) {
								notification.success({ description: "thanks" });
								setShow(false);
							}
						}}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
