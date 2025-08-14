/** @format */

import React, { useState, useEffect } from "react";
import styles from "./Tours.module.scss";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import TourAi from "./components/TourAi/TourAi";
import Contents from "./components/Contents/Contents";
import { useAuth } from "../../../../Contexts/Auth/Auth";

export default function Tours({ className }) {
	const [plans, setPlans] = useState([]);
	const [show, setShow] = useState(false);
	const [hide, setHide] = useState(false);
	const [id, setId] = useState(null);
	const { userId } = useAuth();
	console.log("poke");
	//
	useEffect(() => {
		axios
			.post(`${import.meta.env.VITE_BE_URL}/v1/api/plan/GetAll`, {
				UserId: userId,
			})
			.then((res) => setPlans(res.data))
			.catch((err) => console.error(err.message));
	}, []);
	return (
		<div className={className}>
			{" "}
			{hide && <TourAi setHide={setHide} />}
			{show && (
				<Contents
					name={plans[id].name}
					details={plans[id].details}
					setShow={setShow}
				/>
			)}
			<div className={styles.container}>
				{/** */}

				<div className={styles.header}>
					<h3>Plan</h3>
					<div className={styles.left}>
						<button
							onClick={() => {
								setHide(!hide);
							}}
						>
							<IoAddCircleSharp />
						</button>
					</div>
				</div>
				<div className={styles.plans}>
					{plans.map((value, id) => (
						<div
							className={styles.plan}
							key={id}
							onClick={() => {
								setShow(true);
								setId(id);
							}}
						>
							<div className={styles.title}>
								<h3>{value.name}</h3>
							</div>
							<ReactMarkdown>{value.details}</ReactMarkdown>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
