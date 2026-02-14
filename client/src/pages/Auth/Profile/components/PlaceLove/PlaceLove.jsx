/** @format */

import React, { useEffect, useState } from "react";
import styles from "./PlaceLove.module.scss";
import axios from "axios";
import { useAuth } from "../../../../../Contexts/Auth/Auth";
export default function PlaceLove({ className }) {
    const { userId } = useAuth();
    const [lovePlaces, setLovePlaces] = useState([]);
    const [infor, setInfor] = useState([]);
    useEffect(() => {
        try {
            axios
                .post(`${import.meta.env.VITE_BE_URL}/v1/api/place/GetAll`, {
                    UserId: userId,
                })
                .then((res) => {
                    console.log(res.data);
                    setLovePlaces(res.data);
                });
        } catch (err) {
            console.log(err.message);
        }
    }, []);
    useEffect(() => {
        const getInfor = async () => {
            try {
                const res = await Promise.all(
                    lovePlaces.map(async (value) => {
                        const name = value.name.split(",")[0];
                        try {
                            const kq = await axios.post(
                                `${import.meta.env.VITE_BE_URL}/v1/api/ai`,
                                {
                                    prompt: `đưa 1 số thông tin về ${name} 70 từ`,
                                },
                                {
                                    headers: {
                                        UserId: [],
                                    },
                                },
                            );

                            return kq.data.choices[0].message.content || "";
                        } catch (err) {
                            console.log(err.message);
                            return "";
                        }
                    }),
                );
                setInfor(res);
            } catch (err) {
                console.log(err.message);
            }
        };
        getInfor();
    }, [lovePlaces]);
    console.log(infor);
    const address = (s) => {
        const a = s.split(",");
        let addr = "";
        for (var i = 1; i < a.length - 1; ++i) {
            addr += a[i].trim() + (i < a.length - 2 ? "," : "");
        }
        return addr;
    };
    return (
        <div className={className}>
            <h3 className={styles.title}>Địa điểm yêu thích</h3>
            <div className={styles.places}>
                {lovePlaces.map((value, id) => (
                    <div className={styles.place} key={id}>
                        <img src={value.img} alt="khong co" />
                        <div className={styles.content}>
                            <div className={styles.address}>
                                <h4>{value.name.split(",")[0]}</h4>

                                <p>{address(value.name)}</p>
                            </div>
                            <div className={styles.describe}>
                                <h3>Mô tả</h3>
                                <p>{infor[id]}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
