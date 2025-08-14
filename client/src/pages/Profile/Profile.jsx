/** @format */

import styles from "./Profile.module.scss";
import InForUser from "./components/InForUser/InForUser";
import PlaceLove from "./components/PlaceLove/PlaceLove";
import Tours from "./components/Tours/Tours";
export default function Profile() {
	return (
		<div className={styles.container}>
			<div className={styles.first}>
				<InForUser className={styles.left} />
				<PlaceLove className={styles.right} />
			</div>
			<Tours className={styles.second} />
		</div>
	);
}
