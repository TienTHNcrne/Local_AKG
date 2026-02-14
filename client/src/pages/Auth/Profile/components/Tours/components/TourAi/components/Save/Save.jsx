/** @format */

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { notification } from "antd";
import styles from "./Save.module.scss";
export default function Save({ details, setConfirm }) {
	const [name, setName] = useState("");
	const [save, setSave] = useState([]);
	const [exist, setExist] = useState(false);
	useEffect(() => {
		if (!localStorage.getItem("userid")) return;
		try {
			axios
				.post(`${import.meta.env.VITE_BE_URL}/v1/api/plan/GetAll`, {
					UserId: localStorage.getItem("userid"),
				})
				.then((res) => setSave(res.data))
				.catch((err) => console.log(err.message));
		} catch (err) {
			console.log(err.message);
		}
	}, []);
	//
	console.log(save);
	const submit = () => {
		let check = false;
		save.forEach((value) => {
			if (value.name === name) {
				check = true;
				return;
			}
		});
		console.log(check);
		if (check) {
			setExist(true);
			return;
		}
		try {
			axios
				.post(`${import.meta.env.VITE_BE_URL}/v1/api/plan/create`, {
					UserId: localStorage.getItem("userid"),
					name: name,
					details: details,
				})
				.then((res) => {
					console.log(res);
					notification.success({ description: "oke" });
					setConfirm(false);
				})
				.catch((err) => console.log(err.message));
		} catch (err) {
			console.log(err.message);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Hay Kiểm tra hành trình bạn muốn lưu nhé !</h2>
				<div className={styles.header}>
					<label htmlFor='name'>
						<h3>Name Plan:</h3>
					</label>
					<input
						type='text'
						name='name'
						id='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					{exist && (
						<div>
							<p style={{ color: "red" }}>
								Tên đã tồn tại ! Vui lòng đặt tên khác
							</p>
						</div>
					)}
				</div>
				<div className={styles.mid}>
					<ReactMarkdown>{details}</ReactMarkdown>
				</div>
				<div className={styles.option}>
					<button
						className={styles.cancel}
						onClick={() => {
							setConfirm(false);
						}}
					>
						Cancel
					</button>
					<button
						className={styles.save}
						onClick={() => {
							setExist(false);
							submit();
						}}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
