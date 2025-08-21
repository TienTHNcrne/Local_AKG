/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { IoHome, IoShareSocial } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import { AiFillProfile } from "react-icons/ai";
import { useAuth } from "../../../Contexts/Auth/Auth";
import { FaStar } from "react-icons/fa6";
import TourAi from "../../../pages/Profile/components/Tours/components/TourAi/TourAi";
export default function Header() {
    const { logout } = useAuth();
    const [add, setAdd] = useState(false);
    const [show, setShow] = useState(false);
    return (
        <div className={styles.header}>
            {add && <TourAi setHide={setAdd} />}
            <Link to="/" className={styles.logo}>
                <h2>AKG</h2>
            </Link>

            <nav className={styles.nav}>
                <div className={styles.dropdown}>
                    <Link to="/">
                        <IoHome />
                        <span>Trang chủ</span>
                    </Link>
                    <ul className={styles.dropdownMenu}>
                        <li>
                            <Link to="/Location">Location</Link>
                        </li>
                        <li>
                            <Link to="/Climate">Climate</Link>
                        </li>
                        <li>
                            <Link to="/History">History</Link>
                        </li>
                        <li>
                            <Link to="/CulSoc">Culture-Society</Link>
                        </li>
                        =
                        <li>
                            <Link to="/Religion">Religion</Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.dropdown}>
                    <Link to="/Explore">
                        <IoShareSocial />
                        <span>Khám phá</span>
                    </Link>
                    <ul className={styles.dropdownMenu}>
                        <li>
                            <Link to="/Explore/map">Map</Link>
                        </li>
                        <li>
                            <Link to="/Explore/event">Event</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <Link to="/About">Về chúng tôi</Link>
                </div>
            </nav>

            <div className={styles.right}>
                <button className={styles.icon} onClick={() => setAdd(true)}>
                    <FaStar />{" "}
                </button>
                <FaBell className={styles.icon} />
                <div className={styles.account}>
                    <MdAccountCircle
                        onClick={() => {
                            setShow(!show);
                        }}
                        className={styles.icon}
                    />
                    {show && (
                        <div className={styles.infor}>
                            <Link to="/profile">
                                <div className={styles.item}>
                                    <AiFillProfile />
                                    <p>Profile</p>
                                </div>
                            </Link>
                            <button
                                onClick={() => {
                                    logout();
                                }}
                            >
                                <div className={styles.item}>
                                    <IoLogInOutline /> <p>Login out</p>
                                </div>{" "}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
