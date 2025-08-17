/** @format */

import React, { useState } from "react";
import styles from "./History.module.scss";
import Before from "./Components/Before/Before";
import After from "./Components/After/After";
export default function History() {
	const [choose, setChoose] = useState("before");
	return (
		<div className={styles.container}>
			<p>
				Ngày 12/6/2025, Quốc hội thông qua Nghị quyết 202/2025/QH15 –
				sáp nhập tỉnh Kiên Giang vào tỉnh An Giang, từ đó mở ra kỷ
				nguyên phát triển đồng bộ và nâng tầm vị thế vùng Đồng bằng sông
				Cửu Long.
			</p>
			<div className={styles.header}>
				<div className={styles.before}>
					<h2
						onClick={() => {
							setChoose("before");
						}}
						className={choose === "before" ? styles.processing : ""}
					>
						Trước sáp nhập
					</h2>
				</div>
				<div className={styles.after}>
					<h2
						onClick={() => {
							setChoose("after");
						}}
						className={choose === "after" ? styles.processing : ""}
					>
						Sau sáp nhập
					</h2>
				</div>
			</div>
			{choose === "before" ? <Before /> : <After />}
		</div>
	);
}
