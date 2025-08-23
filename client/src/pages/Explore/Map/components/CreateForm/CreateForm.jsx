/** @format */

import React, { useEffect, useState } from "react";
import styles from "./CreateForm.module.scss";
import Create from "../../Hooks/Create";
import useSuggest from "../../Hooks/useSuggest";
import useCheckExist from "../../Hooks/useCheckExist";
import UpImg from "../../../../../components/UpImg/UpImg";
import { RiDeleteBin6Fill } from "react-icons/ri";

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
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [showSuggest, setShowSuggest] = useState(false);
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false); // state loading

    const suggest = useSuggest(search);
    const exist = useCheckExist(center, search);

    useEffect(() => {
        setShowSuggest(true);
    }, [search]);
    console.log(showSuggest);

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
        if (category !== "undefine" && description && search) {
            setLoading(true);
            try {
                await Create(
                    center,
                    search,
                    description,
                    category,
                    AddNewLocal,
                    images,
                    time
                );
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className={`${styles.add} ${add ? styles.open : styles.close}`}>
            <button
                className={styles.closeee}
                onClick={() => {
                    setShow(false);
                }}
            >
                &times;
            </button>
            <label htmlFor="name">Tên địa điểm</label>
            <input
                type="text"
                name="name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {exist && (
                <div className={styles.existWarning}>Địa danh đã tồn tại!</div>
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

            <div className={styles.describe}>
                <label htmlFor="description">Mô tả</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className={styles.Time}>
                <label htmlFor="time">Thời điểm thích hợp đi du lịch</label>
                <textarea
                    name="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>

            <label htmlFor="category">Phân loại</label>
            <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="undefine">undefine</option>
                <option value="danh-lam">Danh lam thắng cảnh</option>
                <option value="di-tich">Di tích lịch sử</option>
                <option value="le-hoi">Lễ hội</option>
            </select>

            <label htmlFor="image">Hình ảnh</label>
            <div className={styles.second}>
                <UpImg setImages={setImages} className={styles.ro1} />

                <div className={styles.img}>
                    {images.map((value, id) => (
                        <div className={styles.containerImg} key={id}>
                            <img src={value.URL} alt="" />
                            <button
                                type="button"
                                className={styles.delete}
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
            </div>

            <button
                type="button"
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled={loading} // disable khi loading
            >
                {loading ? (
                    <span className={styles.spinner}></span>
                ) : (
                    "Thêm địa danh"
                )}
            </button>
        </div>
    );
}
