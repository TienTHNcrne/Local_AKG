/** @format */
import React, { useState, useEffect, useRef } from "react";
import styles from "./TourAi.module.scss";
import axios from "axios";

import ReactMarkdown from "react-markdown";
import { useAuth } from "../../../../../../Contexts/Auth/Auth";
import GetPlace from "./Hooks/GetPlace";
import GetHis from "./Hooks/GetHis";
import Save from "./components/Save/Save";

export default function TourAi({ setHide }) {
    const [date, setDate] = useState(null);
    const [money, setMoney] = useState(null);
    const [startPlace, setStartPlace] = useState("");
    const { userId } = useAuth();
    const [choose, setChoose] = useState([]);
    const lovePlaces = GetPlace(userId);
    const [save, setSave] = GetHis();
    const [confirm, setConfirm] = useState(false);
    const [details, setDetails] = useState("");
    const [loading, setLoading] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [showPlaces, setShowPlaces] = useState(false);
    const contentRef = useRef(null);

    // Check screen size on mount and resize
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobileView(window.innerWidth <= 768);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const address = (s) => {
        const a = s.split(",");
        let addr = "";
        for (var i = 1; i < a.length - 1; ++i) {
            addr += a[i].trim() + (i < a.length - 2 ? "," : "");
        }
        return addr;
    };

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);

        let s = "";
        if (choose && choose.length > 0) {
            s = "Tôi muốn đi du lịch các địa điểm: ";
            choose.forEach((value) => {
                s += lovePlaces[value].name.split(",")[0] + " ";
            });
        } else {
            s = "Tạo tôi 1 hành trình du lịch An Giang tối ưu";
        }
        s += `Số ngày muốn đi là ${date}, số tiền có thể chi là ${money} và địa điểm xuất phát là ${startPlace}`;

        axios
            .post(
                `${import.meta.env.VITE_BE_URL}/v1/api/tour`,
                { prompt: s },
                { headers: { UserId: userId } }
            )
            .then((res) => {
                const newResult = {
                    role: "assistant",
                    text: res.data,
                    isNew: true,
                };
                setSave((prev) => [...prev, newResult]);
                setLoading(false);
                // On mobile, switch to results view after submission
                if (isMobileView) setShowPlaces(false);
            })
            .catch((err) => {
                console.error(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, [save]);

    return (
        <div className={styles.container}>
            {confirm && <Save details={details} setConfirm={setConfirm} />}

            {/* Mobile toggle button */}
            {isMobileView && (
                <div className={styles.mobileToggle}>
                    <button
                        className={`${styles.toggleBtn} ${
                            showPlaces ? styles.active : ""
                        }`}
                        onClick={() => setShowPlaces(true)}
                    >
                        Địa điểm yêu thích
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${
                            !showPlaces ? styles.active : ""
                        }`}
                        onClick={() => setShowPlaces(false)}
                    >
                        Dựng hành trình
                    </button>
                </div>
            )}

            <div
                className={`${styles.choose} ${
                    isMobileView ? styles.mobile : ""
                } ${showPlaces ? styles.showPlaces : ""}`}
            >
                <button className={styles.close} onClick={() => setHide(false)}>
                    &times;
                </button>
                <div
                    className={`${styles.places} ${
                        isMobileView && !showPlaces ? styles.hidden : ""
                    }`}
                >
                    {" "}
                    <h3>Địa điểm yêu thích</h3>
                    <div className={styles.selectAll}>
                        <label>
                            <input
                                type="checkbox"
                                checked={choose.length === lovePlaces.length}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setChoose(
                                            lovePlaces.map((_, idx) => idx)
                                        );
                                    } else {
                                        setChoose([]);
                                    }
                                }}
                            />
                            Tích tất cả
                        </label>
                    </div>
                    <div className={styles.placesList}>
                        {lovePlaces.map((value, id) => (
                            <div className={styles.place} key={id}>
                                <input
                                    type="checkbox"
                                    value={id}
                                    checked={choose.includes(id)}
                                    onChange={(e) => {
                                        const valueOrigin = Number(
                                            e.target.value
                                        );
                                        if (e.target.checked) {
                                            setChoose((pre) => [
                                                ...pre,
                                                valueOrigin,
                                            ]);
                                        } else {
                                            setChoose((prev) =>
                                                prev.filter(
                                                    (v) => v !== valueOrigin
                                                )
                                            );
                                        }
                                    }}
                                />
                                <img src={value.img} alt="khong co" />
                                <div className={styles.content}>
                                    <div className={styles.address}>
                                        <h4>{value.name.split(",")[0]}</h4>
                                        <p>{address(value.name)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className={`${styles.build} ${
                        isMobileView && showPlaces ? styles.hidden : ""
                    }`}
                >
                    <form className={styles.head}>
                        <div className={styles.top}>
                            <div className={styles.item}>
                                <label htmlFor="date">
                                    <h3>Số ngày bạn muốn đi</h3>
                                </label>
                                <input
                                    type="number"
                                    name="date"
                                    id="date"
                                    value={date}
                                    required={true}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div className={styles.item}>
                                <label htmlFor="money">
                                    <h3>Số tiền bạn muốn chi (triệu đồng)</h3>
                                </label>
                                <input
                                    type="number"
                                    name="money"
                                    id="money"
                                    value={money}
                                    required={true}
                                    onChange={(e) => setMoney(e.target.value)}
                                />
                            </div>
                            <div className={styles.item}>
                                <label htmlFor="place">
                                    <h3>Nơi bạn bắt đầu</h3>
                                </label>
                                <input
                                    type="text"
                                    name="place"
                                    id="place"
                                    value={startPlace}
                                    required={true}
                                    onChange={(e) =>
                                        setStartPlace(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={styles.run}
                            onClick={(e) => submit(e)}
                        >
                            Run
                        </button>
                    </form>

                    <div className={styles.content1} ref={contentRef}>
                        {save
                            .filter((v) => v.role === "assistant")
                            .map((value, id) => (
                                <div className={styles.ok} key={id}>
                                    <div
                                        className={`${styles.value} ${
                                            value.isNew ? styles.newResult : ""
                                        }`}
                                    >
                                        <ReactMarkdown>
                                            {value.text}
                                        </ReactMarkdown>
                                    </div>
                                    <button
                                        className={styles.save}
                                        onClick={() => {
                                            setDetails(value.text);
                                            setConfirm(true);
                                        }}
                                    >
                                        SAVE
                                    </button>
                                </div>
                            ))}
                    </div>

                    {loading && (
                        <div className={styles.loadingOverlay}>
                            <div className={styles.spinner}></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
