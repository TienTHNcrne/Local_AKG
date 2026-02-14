/** @format */

import React, { useState } from "react";
import styles from "./Rate.module.scss";
import { FaStar } from "react-icons/fa6";
import UpImg from "../../../../../../../../../components/UpImg/UpImg";
import RateCreate from "../../../../../Hooks/RateCreate";
import { RiDeleteBin2Fill, RiCloseLine, RiAddLine } from "react-icons/ri";

export default function Rate({ setShow, lng, lat }) {
    const [mark, setMark] = useState(0);
    const [img, setImg] = useState([]);
    const [rate, setRate] = useState(0);
    const [describe, setDescribe] = useState("");
    const autoResize = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };
    console.log(img);
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.star}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            style={{
                                cursor: "pointer",
                                color:
                                    (mark || rate) >= star ? "yellow" : "#ccc",
                            }}
                            onMouseEnter={() => setMark(star)}
                            onMouseLeave={() => setMark(0)}
                            onClick={() => setRate(star)}
                        >
                            <FaStar />
                        </span>
                    ))}
                </div>
                <div className={styles.inFor}>
                    <textarea
                        className={styles.text}
                        type="text"
                        placeholder="Please describe your feeling"
                        onInput={autoResize}
                        rows={1}
                        value={describe}
                        onChange={(e) => {
                            setDescribe(e.target.value);
                        }}
                    />
                    <UpImg setImages={setImg} />{" "}
                    {img.length > 0 && (
                        <div className={styles.imagePreview}>
                            <p className={styles.previewLabel}>
                                Ảnh đã tải lên:
                            </p>
                            <div className={styles.imageGrid}>
                                {img.map((value, id) => (
                                    <div className={styles.imageItem} key={id}>
                                        <img
                                            src={value.URL}
                                            alt={`Preview ${id + 1}`}
                                        />
                                        <button
                                            type="button"
                                            className={styles.deleteImage}
                                            onClick={() =>
                                                setImg(
                                                    img.filter(
                                                        (_, index) =>
                                                            index !== id,
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
                <div className={styles.confirm}>
                    <button
                        type="submit"
                        className={styles.cancel}
                        onClick={() => setShow(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className={styles.submit}
                        type="submit"
                        onClick={() => {
                            RateCreate({
                                lat: lat,
                                lng: lng,
                                comment: describe,
                                rate: rate,
                                imgs: img,
                                setShow: setShow,
                            });
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
