/** @format */
import React, { useEffect, useState } from "react";
import styles from "./CreateForm.module.scss";
import Create from "../../Hooks/Create";
import useSuggest from "../../Hooks/useSuggest";
import useCheckExist from "../../Hooks/useCheckExist";
import UpImg from "../../../../../components/UpImg/UpImg";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiX, FiMapPin, FiCalendar, FiTag, FiImage } from "react-icons/fi";

export default function CreateForm({
    add,
    center,
    setCenter,
    setSearch,
    search,
    AddNewLocal,
    setShow,
}) {
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState([]);
    const [images, setImages] = useState([]);
    const [showSuggest, setShowSuggest] = useState(false);
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);
    const choose = [
        "Biển đảo",
        "Danh lam thắng cảnh",
        "Di tích lịch sử",
        "Lễ hội",
    ];
    const [check, setCheck] = useState([]);
    const suggest = useSuggest(search);
    const exist = useCheckExist(center, search);

    useEffect(() => {
        setShowSuggest(true);
    }, [search]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(`.${styles.add}`)) setShowSuggest(false);
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleSelect = (e) => {
        setSearch(e.name);
        setCenter({ lat: e.lat, lng: e.lng });
        setShowSuggest(false);
    };

    const handleSubmit = async () => {
        if (check.length > 0 && description && search) {
            setLoading(true);
            try {
                const categories = check.map((value) => choose[value]);
                await Create({
                    center,
                    search,
                    description,
                    category: categories,
                    AddNewLocal,
                    images,
                    time,
                });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className={`${styles.add} ${add ? styles.open : styles.close}`}>
            <div className={styles.header}>
                <h2>Thêm địa danh mới</h2>
                <button
                    className={styles.closeBtn}
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    <FiX />
                </button>
            </div>

            <div className={styles.formSection}>
                <div className={styles.inputGroup}>
                    <label htmlFor="name">
                        <FiMapPin />
                        Tên địa điểm
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Nhập tên địa điểm"
                    />
                    {exist && (
                        <div className={styles.existWarning}>
                            Địa danh đã tồn tại!
                        </div>
                    )}

                    {showSuggest && suggest.length > 0 && (
                        <div className={styles.suggests}>
                            {suggest.map((e, id) => (
                                <div
                                    className={styles.suggest}
                                    key={id}
                                    onClick={() => handleSelect(e)}
                                >
                                    {e.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="description">Mô tả</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Mô tả về địa điểm này..."
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="time">
                        <FiCalendar />
                        Thời điểm thích hợp đi du lịch
                    </label>
                    <textarea
                        name="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="Ví dụ: Tháng 11 đến tháng 4 năm sau..."
                        className={styles.timeInput}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="category">
                        <FiTag />
                        Phân loại
                    </label>
                    <div className={styles.checkboxGroup}>
                        {choose.map((value, id) => (
                            <label key={id} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    value={id}
                                    checked={check.includes(id)}
                                    onChange={(e) => {
                                        const number = Number(e.target.value);
                                        if (e.target.checked) {
                                            setCheck((p) => [...p, number]);
                                        } else {
                                            setCheck((p) =>
                                                p.filter((v) => v !== number)
                                            );
                                        }
                                    }}
                                />
                                <span className={styles.checkmark}></span>
                                {value}
                            </label>
                        ))}
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="image">
                        <FiImage />
                        Hình ảnh
                    </label>
                    <UpImg setImages={setImages} className={styles.uploader} />

                    {images.length > 0 && (
                        <div className={styles.imageGrid}>
                            {images.map((value, id) => (
                                <div className={styles.imageContainer} key={id}>
                                    <img src={value.URL} alt="" />
                                    <button
                                        type="button"
                                        className={styles.deleteBtn}
                                        onClick={() =>
                                            setImages(
                                                images.filter(
                                                    (_, index) => index !== id
                                                )
                                            )
                                        }
                                    >
                                        <RiDeleteBin6Fill />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <button
                type="button"
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled={
                    loading ||
                    exist ||
                    !search ||
                    !description ||
                    check.length === 0
                }
            >
                {loading ? (
                    <div className={styles.buttonLoading}>
                        <span className={styles.spinner}></span>
                        Đang xử lý...
                    </div>
                ) : (
                    "Thêm địa danh"
                )}
            </button>
        </div>
    );
}
