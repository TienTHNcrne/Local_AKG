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
        <>
            <aside
                className={`${styles.Sidebar} ${
                    show ? styles.open : styles.hidden
                }`}
            >
                <div>
                    {/*FIRST */}

                    <li>
                        <Link to="/">
                            <IoHome />
                            <span>Home</span>
                        </Link>
                        <ol>
                            <Link to="/Location">
                                <ul>Location</ul>
                            </Link>
                            <Link to="/Climate">
                                <ul>Climate</ul>
                            </Link>
                            <Link to="/History">
                                <ul>History</ul>
                            </Link>
                            <Link to="/">
                                <ul>Culture-Society</ul>
                            </Link>
                            <Link to="/">
                                <ul>Note</ul>
                            </Link>
                            <Link to="/">
                                <ul>Food</ul>
                            </Link>
                        </ol>
                    </li>
                    {/*SECOND */}
                    <li>
                        <Link to="/Explore">
                            <IoShareSocial /> <span>Explore</span>
                        </Link>
                    </li>
                    {/*THIRD */}

                    <li>
                        <Link to="/Events">
                            <IoHappy /> <span>Events</span>
                        </Link>
                    </li>
                    {/*FOUR */}

                    <li>
                        <Link to="/About">
                            <IoInformationCircle /> <span>About</span>
                        </Link>
                    </li>
                </div>
            </aside>
        </>
    );
}
