/** @format */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Rate from "./Rate/Rate";
import styles from "./Comments.module.scss";
import { FaStar } from "react-icons/fa6";

export default function Comments() {
	const reviews = [
		{
			UserName: "Nguyễn Văn A",
			rate: 5,
			describe: "Sản phẩm tuyệt vời, chất lượng tốt hơn mong đợi!",
			img: ["/1.jpg", "/unnamed (1).jpg"],
			date: "2023-10-15",
		},
		{
			UserName: "Trần Thị B",
			rate: 4,
			describe: "Tốt nhưng giá hơi cao so với chất lượng",
			img: [],
			date: "2023-10-10",
		},
		{
			UserName: "Lê Văn C",
			rate: 3,
			describe: "Sản phẩm tạm được, giao hàng chậm",
			img: [],
			date: "2023-10-05",
		},
		{
			UserName: "Phạm Thị D",
			rate: 2,
			describe: "Không giống hình ảnh, chất lượng kém",
			img: [],
			date: "2023-09-28",
		},
		{
			UserName: "Hoàng Văn E",
			rate: 1,
			describe: "Hàng lỗi, không sử dụng được",
			date: "2023-09-20",
		},
		{
			UserName: "Vũ Thị F",
			rate: 5,
			describe: "Hoàn hảo từ A đến Z!",
			img: [],
			date: "2023-09-15",
		},
		{
			UserName: "Đặng Văn G",
			rate: 4,
			describe: "Tốt nhưng thiếu phụ kiện đi kèm",
			img: [],
			date: "2023-09-10",
		},
	];
	const [show, setShow] = useState(false);
	console.log(show);
	return (
		<div className={styles.container}>
			<button className={styles.review} onClick={() => setShow(true)}>
				Please to write a review{" "}
			</button>
			{show &&
				ReactDOM.createPortal(
					<div className={styles.roof}>
						<div className={styles.modal}>
							<button
								onClick={() => setShow(false)}
								className={styles.close}
							>
								&times;
							</button>
							<Rate setShow={setShow} />
						</div>
					</div>,
					document.body
				)}
			<div className={styles.comments}>
				{reviews.map((value, id) => (
					<div className={styles.comment} key={id}>
						<div className={styles.item1}>
							<h3>{value.UserName}</h3>
						</div>
						<div className={styles.item2}>
							<div className={styles.star}>
								{[1, 2, 3, 4, 5].map((star) => (
									<span
										style={{
											cursor: "pointer",
											color:
												value.rate >= star
													? "yellow"
													: "#ccc",
										}}
									>
										<FaStar />
									</span>
								))}
							</div>
							{value.date}
						</div>
						<div className={styles.item3}>{value.describe}</div>
						{value.img && (
							<div className={styles.images}>
								{value.img.length > 0 &&
									value.img.map((value, id) => (
										<img
											src={value}
											alt={`Ảnh ${id + 1}`}
											key={id}
										/>
									))}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
