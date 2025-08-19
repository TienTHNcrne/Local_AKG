/** @format */

import styles from "./Sidebar.module.scss";
import { Link } from "react-router-dom";
import {
	IoHome,
	IoShareSocial,
	IoHappy,
	IoBook,
	IoInformationCircle,
	IoMenu,
} from "react-icons/io5";

export default function Sidebar({ show }) {
	return (
		<aside
			className={`${styles.Sidebar} ${
				show ? styles.open : styles.hidden
			}`}
		>
			<div>
				{/*FIRST */}

				<li>
					<Link to='/'>
						<IoHome />
						<span>Home</span>
					</Link>
					<ol>
						<li>
							<Link to='/Location'>
								<span>Location</span>
							</Link>
						</li>
						<li>
							<Link to='/Climate'>
								<span>Climate</span>
							</Link>
						</li>
						<li>
							<Link to='/History'>
								<span>History</span>
							</Link>
						</li>
						<li>
							<Link to='/'>
								<span>Culture-Society</span>
							</Link>
						</li>
						<li>
							<Link to='/'>
								<span>Note</span>
							</Link>
						</li>
						<li>
							<Link to='/'>
								<span>Food</span>
							</Link>
						</li>
					</ol>
				</li>
				{/*SECOND */}
				<li>
					<Link to='/Explore'>
						<IoShareSocial />
						<span>Explore</span>
					</Link>
					<ol>
						<li>
							<Link to='/Explore/map'>
								<span>Map</span>
							</Link>
						</li>
						<li>
							<Link to='/Explore/event'>
								<span>Event</span>
							</Link>
						</li>
					</ol>
				</li>

				{/*THIRD */}

				<li>
					<Link to='/Events'>
						<IoHappy /> <span>Events</span>
					</Link>
				</li>
				{/*FOUR */}

				<li>
					<Link to='/About'>
						<IoInformationCircle /> <span>About</span>
					</Link>
				</li>
			</div>
		</aside>
	);
}
