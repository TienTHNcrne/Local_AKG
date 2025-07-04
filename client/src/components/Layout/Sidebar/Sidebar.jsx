import styles from "./Sidebar.module.scss";
import { Link } from "react-router-dom";
import {
    MdExplore,
    MdFestival,
    MdInfo,
    MdEventAvailable,
} from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaMapMarkedAlt } from "react-icons/fa";
import {
    GiCook,
    GiParkBench,
    GiMonumentValley,
    GiVillage,
} from "react-icons/gi";

export default function Sidebar({ show }) {
    return (
        <nav className={`${styles.Sidebar} ${!show && styles.closed}`}>
            <ul>
                <li className={styles.item}>
                    <IoHome />
                    <Link to="/" className="label">
                        Home
                    </Link>
                </li>

                <li>
                    <div className={styles.item}>
                        <MdExplore />
                        <Link to="/" className="label">
                            Explore
                        </Link>
                    </div>
                    <ul className={styles.Explore}>
                        <li className={styles.item}>
                            <GiCook /> <Link to="/">Food</Link>
                        </li>
                        <li className={styles.item}>
                            <GiParkBench />
                            <Link to="/">Parks & Fun</Link>
                        </li>
                        <li className={styles.item}>
                            <GiMonumentValley />
                            <Link to="/">History & Culture</Link>
                        </li>
                        <li className={styles.item}>
                            <FaMapMarkedAlt /> <Link to="/">Landmarks</Link>
                        </li>
                        <li className={styles.item}>
                            <MdFestival />
                            <Link to="/">Festivals</Link>
                        </li>
                        <li className={styles.item}>
                            <GiVillage /> <Link to="/">Homestays</Link>
                        </li>
                    </ul>
                </li>

                <li className={styles.item}>
                    <FaMapMarkedAlt />
                    <Link to="/" className="label">
                        Maps
                    </Link>
                </li>

                <li className={styles.item}>
                    <MdEventAvailable />
                    <Link to="/" className="label">
                        Events
                    </Link>
                </li>

                <li className={styles.item}>
                    <MdInfo />
                    <Link to="/" className="label">
                        About
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
