/** @format */
import React, { useState } from "react";
import styles from "./AddFes.module.scss";
import axios from "axios";
import UpImg from "../../../../../../../../components/UpImg/UpImg.jsx";
import {
    RiDeleteBin2Fill,
    RiCloseLine,
    RiAddLine,
    RiCalendarEventLine,
    RiMapPinLine,
    RiImageLine,
} from "react-icons/ri";

export default function AddFes({ setShow }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [places, setPlaces] = useState([""]);
    const [times, setTimes] = useState([""]);
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Places ---
    const handlePlaceChange = (index, value) => {
        const newPlaces = [...places];
        newPlaces[index] = value;
        setPlaces(newPlaces);
    };
    const addPlace = () => setPlaces([...places, ""]);
    const removePlace = (index) =>
        setPlaces(places.filter((_, i) => i !== index));

    // --- Times ---
    const handleTimeChange = (index, value) => {
        const newTimes = [...times];
        newTimes[index] = value;
        setTimes(newTimes);
    };
    const addTime = () => setTimes([...times, ""]);
    const removeTime = (index) => setTimes(times.filter((_, i) => i !== index));

    const submit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Filter out empty values
        const filteredPlaces = places.filter((p) => p.trim() !== "");
        const filteredTimes = times.filter((t) => t.trim() !== "");

        if (
            !name.trim() ||
            !description.trim() ||
            filteredPlaces.length === 0 ||
            filteredTimes.length === 0
        ) {
            alert("Vui lòng điền đầy đủ thông tin");
            setIsSubmitting(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);

            // Append arrays properly
            filteredPlaces.forEach((place, index) => {
                formData.append(`places[${index}]`, place);
            });

            filteredTimes.forEach((time, index) => {
                formData.append(`times[${index}]`, time);
            });

            // Append images
            images.forEach((img) => {
                if (img instanceof File) {
                    formData.append("images", img);
                } else if (img.File) {
                    formData.append("images", img.File);
                }
            });

            const res = await axios.post(
                `${import.meta.env.VITE_BE_URL}/v1/api/festival/create`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );

            console.log("Thêm thành công:", res.data);
            alert("Thêm lễ hội thành công!");
            setShow(false);
        } catch (err) {
            console.error("Lỗi:", err.response?.data || err.message);
            alert(
                "Có lỗi xảy ra khi thêm lễ hội: " +
                    (err.response?.data?.message || err.message),
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h2>Thêm lễ hội mới</h2>
                    <button
                        className={styles.close}
                        onClick={() => setShow(false)}
                    >
                        <RiCloseLine />
                    </button>
                </div>

                <form onSubmit={submit} className={styles.form}>
                    {/* Tên lễ hội */}
                    <div className={styles.formGroup}>
                        <label>Tên lễ hội *</label>
                        <input
                            type="text"
                            placeholder="Nhập tên lễ hội"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Mô tả */}
                    <div className={styles.formGroup}>
                        <label>Mô tả *</label>
                        <textarea
                            placeholder="Mô tả chi tiết về lễ hội..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            required
                        />
                    </div>

                    {/* Địa điểm */}
                    <div className={styles.formGroup}>
                        <label className={styles.sectionLabel}>
                            <RiMapPinLine className={styles.icon} />
                            Địa điểm tổ chức *
                        </label>
                        <div className={styles.places}>
                            {places.map((p, idx) => (
                                <div className={styles.placeItem} key={idx}>
                                    <input
                                        type="text"
                                        placeholder={`Địa điểm ${idx + 1}`}
                                        value={p}
                                        onChange={(e) =>
                                            handlePlaceChange(
                                                idx,
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {places.length > 1 && (
                                        <button
                                            type="button"
                                            className={styles.removeBtn}
                                            onClick={() => removePlace(idx)}
                                        >
                                            <RiCloseLine />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                className={styles.addBtn}
                                onClick={addPlace}
                            >
                                <RiAddLine /> Thêm địa điểm
                            </button>
                        </div>
                    </div>

                    {/* Thời gian */}
                    <div className={styles.formGroup}>
                        <label className={styles.sectionLabel}>
                            <RiCalendarEventLine className={styles.icon} />
                            Thời gian tổ chức *
                        </label>
                        <div className={styles.times}>
                            {times.map((t, idx) => (
                                <div className={styles.timeItem} key={idx}>
                                    <input
                                        type="text"
                                        placeholder={`Thời gian ${idx + 1}`}
                                        value={t}
                                        onChange={(e) =>
                                            handleTimeChange(
                                                idx,
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {times.length > 1 && (
                                        <button
                                            type="button"
                                            className={styles.removeBtn}
                                            onClick={() => removeTime(idx)}
                                        >
                                            <RiCloseLine />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                className={styles.addBtn}
                                onClick={addTime}
                            >
                                <RiAddLine /> Thêm thời gian
                            </button>
                        </div>
                    </div>

                    {/* Hình ảnh */}
                    <div className={styles.formGroup}>
                        <label className={styles.sectionLabel}>
                            <RiImageLine className={styles.icon} />
                            Hình ảnh
                        </label>
                        <div className={styles.imageSection}>
                            <UpImg
                                setImages={setImages}
                                className={styles.uploader}
                            />
                            {images.length > 0 && (
                                <div className={styles.imagePreview}>
                                    <p className={styles.previewLabel}>
                                        Ảnh đã tải lên:
                                    </p>
                                    <div className={styles.imageGrid}>
                                        {images.map((value, id) => (
                                            <div
                                                className={styles.imageItem}
                                                key={id}
                                            >
                                                <img
                                                    src={
                                                        value.URL ||
                                                        URL.createObjectURL(
                                                            value,
                                                        )
                                                    }
                                                    alt={`Preview ${id + 1}`}
                                                />
                                                <button
                                                    type="button"
                                                    className={
                                                        styles.deleteImage
                                                    }
                                                    onClick={() =>
                                                        setImages(
                                                            images.filter(
                                                                (_, index) =>
                                                                    index !==
                                                                    id,
                                                            ),
                                                        )
                                                    }
                                                >
                                                    <RiDeleteBin2Fill />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className={styles.formActions}>
                        <button
                            type="button"
                            className={styles.cancelBtn}
                            onClick={() => setShow(false)}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Đang xử lý..." : "Thêm lễ hội"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
