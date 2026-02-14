/** @format */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Rate from "./Rate/Rate";
import styles from "./Comments.module.scss";
import { FaStar } from "react-icons/fa6";
import axios from "axios";
import { MdAccountCircle } from "react-icons/md";

export default function Comments({ lat, lng }) {
    const [reviews, setReviews] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BE_URL}/v1/api/rate/getAll`, {
                params: { lat, lng },
            })
            .then((res) => setReviews(res.data))
            .catch((err) => console.error(err));
    }, [lat, lng]);
    console.log(reviews);
    return (
        <div className={styles.container}>
            <button className={styles.review} onClick={() => setShow(true)}>
                Hãy viết nhận xét của bạn nhé!{" "}
            </button>

            {show &&
                ReactDOM.createPortal(
                    <div className={styles.roof} onClick={() => setShow(false)}>
                        <div
                            className={styles.modal}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShow(false)}
                                className={styles.close}
                            >
                                &times;
                            </button>
                            <Rate setShow={setShow} lat={lat} lng={lng} />
                        </div>
                    </div>,
                    document.body
                )}

            <div className={styles.comments}>
                {reviews.map((value) => (
                    <div className={styles.comment}>
                        <div className={styles.item1}>
                            <div className={styles.left}>
                                {value.avatar || value.img ? (
                                    <img
                                        src={value.avatar || value.img}
                                        alt="user"
                                    />
                                ) : (
                                    <MdAccountCircle className={styles.icon} />
                                )}
                            </div>
                            <div className={styles.right}>
                                <h5>{value.UserId.name}</h5>
                                <div className={styles.bottom}>
                                    <div className={styles.star}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                style={{
                                                    cursor: "pointer",
                                                    color:
                                                        value.rate >= star
                                                            ? "yellow"
                                                            : "#ccc",
                                                }}
                                            >
                                                <FaStar />
                                            </span>
                                        ))}
                                    </div>
                                    <div>
                                        {new Date(
                                            value.createdAt
                                        ).toLocaleDateString()}
                                    </div>
                                </div>{" "}
                            </div>
                        </div>
                        <div className={styles.item3}>{value.comment}</div>
                        {value.imgs.length > 0 && (
                            <div className={styles.images}>
                                {value.imgs.map((img, id) => (
                                    <img
                                        src={img}
                                        alt={`Ảnh ${id + 1}`}
                                        key={id}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
