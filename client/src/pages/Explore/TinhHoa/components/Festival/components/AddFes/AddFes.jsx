/** @format */
import React, { useState } from "react";
import styles from "./AddFes.module.scss";
import axios from "axios";
import UpImg from "../../../../../../../components/UpImg/UpImg";
import { RiDeleteBin2Fill, RiCloseLine, RiAddLine } from "react-icons/ri";

export default function AddFes({ setShow }) {
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [places, setPlaces] = useState([""]);
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePlaceChange = (index, value) => {
        const newPlaces = [...places];
        newPlaces[index] = value;
        setPlaces(newPlaces);
    };

    const addPlace = () => setPlaces([...places, ""]);
    const removePlace = (index) =>
        setPlaces(places.filter((_, i) => i !== index));

    const submit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Basic validation
        if (
            !name.trim() ||
            !time.trim() ||
            !description.trim() ||
            places.some((p) => !p.trim())
        ) {
            alert("Vui lòng điền đầy đủ thông tin");
            setIsSubmitting(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("time", time);
            formData.append("place", JSON.stringify(places));

            images.forEach((img) => {
                formData.append("images", img.File);
            });

            const res = await axios.post(
                `${import.meta.env.VITE_BE_URL}/v1/api/festival/create`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log("Thêm thành công:", res.data);
            alert("Thêm lễ hội thành công!");
            setShow(false);
        } catch (err) {
            console.error("Lỗi:", err.response?.data || err.message);
            alert("Có lỗi xảy ra khi thêm lễ hội");
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
                    <div className={styles.formGroup}>
                        <label>Tên lễ hội *</label>
                        <input
                            type="text"
                            value={name}
                            placeholder="Nhập tên lễ hội"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Thời gian *</label>
                        <input
                            type="text"
                            value={time}
                            placeholder="Ví dụ: 10-15/3 âm lịch hàng năm"
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>

                    {/* Mảng địa điểm */}
                    <div className={styles.formGroup}>
                        <label>Địa điểm tổ chức *</label>
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
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    {places.length > 1 && (
                                        <button
                                            type="button"
                                            className={styles.removeBtn}
                                            onClick={() => removePlace(idx)}
                                            title="Xóa địa điểm"
                                        >
                                            <RiCloseLine />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                className={styles.addPlaceBtn}
                                onClick={addPlace}
                            >
                                <RiAddLine /> Thêm địa điểm
                            </button>
                        </div>
                    </div>

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

                    <div className={styles.formGroup}>
                        <label>Hình ảnh</label>
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
                                                    src={value.URL}
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
                                                                    index !== id
                                                            )
                                                        )
                                                    }
                                                    title="Xóa ảnh"
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
