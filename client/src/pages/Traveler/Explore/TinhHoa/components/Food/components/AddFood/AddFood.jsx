import React, { useState } from "react";
import axios from "axios";
import UpImg from "../../../../../../../../components/UpImg/UpImg.jsx";
import { RiDeleteBin2Fill, RiCloseLine, RiAddLine } from "react-icons/ri";

import styles from "./AddFood.module.scss";

export default function AddFood({ setShow }) {
    const [name, setName] = useState("");
    const [general, setGeneral] = useState("");
    const [places, setPlaces] = useState("");
    const [smell, setSmell] = useState("");
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [price, setPrice] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (
            !name.trim() ||
            !general.trim() ||
            !smell.trim() ||
            !price.trim() ||
            !places.trim()
        ) {
            alert("Vui lòng điền đầy đủ thông tin");
            setIsSubmitting(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("general", general);
            formData.append("smell", smell);
            formData.append("price", price);
            formData.append("place", places);

            images.forEach((img) => formData.append("images", img.File));

            const res = await axios.post(
                `${import.meta.env.VITE_BE_URL}/v1/api/food/create`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } },
            );

            console.log("Thêm thành công:", res.data);
            alert("Thêm thành công!");
            setShow(false);
        } catch (err) {
            console.error("Lỗi:", err.response?.data || err.message);
            alert("Có lỗi xảy ra");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h2>Thêm món ăn mới</h2>
                    <button
                        className={styles.close}
                        onClick={() => setShow(false)}
                    >
                        <RiCloseLine />
                    </button>
                </div>
                {/** */}
                <form onSubmit={submit} className={styles.form}>
                    <div className={styles.formGroup}>
                        {" "}
                        <label htmlFor="item0">Tên món ăn</label>
                        <input
                            required={true}
                            type="text"
                            name="item0"
                            id="item0"
                            placeholder="Bún Cá"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="item1">Giới thiệu</label>
                        <input
                            required={true}
                            type="text"
                            name="item1"
                            id="item1"
                            placeholder="Xuất phát từ Châu Đốc, đặc trưng bởi cá lóc đồng ..."
                            value={general}
                            onChange={(e) => setGeneral(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        {" "}
                        <label htmlFor="item2">Hương vị</label>
                        <input
                            required={true}
                            type="text"
                            name="item2"
                            id="item2"
                            placeholder="Nước lèo ngọt thanh từ cá, mùi nghệ thơm ..."
                            value={smell}
                            onChange={(e) => setSmell(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        {" "}
                        <label htmlFor="item3">Địa điểm</label>
                        <input
                            required={true}
                            type="text"
                            name="item3"
                            id="item3"
                            placeholder="Chợ Châu Đốc, TP. Long Xuyên  ..."
                            value={places}
                            onChange={(e) => setPlaces(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        {" "}
                        <label htmlFor="item4">Giá tiền</label>
                        <input
                            required={true}
                            type="text"
                            name="item4"
                            id="item4"
                            placeholder="25k–35k/tô..."
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
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
                                                                    index !==
                                                                    id,
                                                            ),
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
                            {isSubmitting ? "Đang xử lý..." : "Thêm món ăn"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
