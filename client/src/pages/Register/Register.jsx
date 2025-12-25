/** @format */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import axios from "axios";
import Login from "../Login/Login";
import { useAuth } from "../../Contexts/Auth/Auth";
import { notification } from "antd";
export default function Register() {
	const { login } = useAuth();

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [pass2, setPass2] = useState("");
	const [name, setName] = useState("");
	const nextPage = useNavigate();
	const submit = (e) => {
		e.preventDefault();
		axios
			.post(`${import.meta.env.VITE_BE_URL}/v1/api/register`, {
				name: name,
				email: email,
				password: pass,
			})
			.then((res) => {
				notification.success({ description: "oke" });
				localStorage.setItem("name", name);
				login(res.data._id);
				localStorage.setItem("name", res.data.name);
				localStorage.setItem("email", res.data.email);
				nextPage("/");
			})
			.catch((err) => {
				console.log(err.message);
				notification.error({ description: "err" });
			});
	};
	return (
		<div className={styles.Login}>
			<div className={styles.Login_form}>
				<div className={styles.intro}>
					<p>Please enter your details </p>
					<h2>Create an account</h2>
					<hr></hr>
				</div>
				<div className={styles.content}>
					<input
						placeholder='Username'
						type='text'
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
					<input
						placeholder='Email'
						type='email'
						value={email}
						className={styles.email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<input
						placeholder='password'
						type='password'
						className={styles.password}
						value={pass}
						onChange={(e) => {
							setPass(e.target.value);
						}}
					/>
					<input
						placeholder=' Repeat password'
						type='password'
						className={styles.password}
						value={pass2}
						onChange={(e) => {
							setPass2(e.target.value);
						}}
					/>
				</div>
				<div className={styles.end}>
					<button onClick={(e) => submit(e)}>Create</button>
					<div className={styles.add}>
						<p>Do you have an account? </p>
						<Link to='/Login'>Sign in</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
