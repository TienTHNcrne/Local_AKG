/** @format */

import React from "react";
import styles from "./ReqCreatingTour.module.scss";
import { useTour } from "../../Contexts/useTour";
import axios from "axios";
import { toast } from "react-toastify";

export default function ReqCreatingTour({ className }) {
    const {
        days,
        setDays,
        budget,
        setBudget,
        startPlace,
        setStartPlace,
        isLoading,
        setLoading,
        setChatPresent,
        lovePlaces,
    } = useTour();

    // ================= BUILD PROMPT AN TOÀN =================
    const buildPrompt = () => {
        let prompt = "";

        if (Array.isArray(lovePlaces) && lovePlaces.length > 0) {
            const places = lovePlaces
                .filter((p) => p?.name && typeof p.name === "string")
                .map((p) => p.name.split(",")[0])
                .join(", ");

            if (places.length > 0) {
                prompt = `Tôi muốn đi du lịch các địa điểm: ${places}. `;
            } else {
                prompt = "Tạo tôi 1 hành trình du lịch An Giang. ";
            }
        } else {
            prompt = "Tạo tôi 1 hành trình du lịch An Giang. ";
        }

        prompt += `| Số ngày: ${days} ngày | Ngân sách: ${budget} triệu đồng | Xuất phát từ: ${startPlace}`;

        return prompt;
    };

    // ================= SUBMIT =================
    const onSubmit = async () => {
        try {
            // Validate
            if (!days || !budget || !startPlace) {
                toast.error("Vui lòng nhập đầy đủ thông tin");
                return;
            }

            const userId = localStorage.getItem("userid");
            if (!userId) {
                toast.error("Bạn chưa đăng nhập");
                return;
            }

            const prompt = buildPrompt();
            console.log("PROMPT:", prompt);

            setLoading(true);

            const res = await axios.post(
                `${import.meta.env.VITE_BE_URL}/v1/api/tour`,
                { prompt },
                { headers: { UserId: userId } },
            );

            setChatPresent((prev) => [
                ...prev,
                { role: "assistant", text: res.data, isNew: true },
            ]);

            toast.success("Tạo tour thành công!");
        } catch (err) {
            console.error("API ERROR:", err);
            toast.error("Tạo tour thất bại");
        } finally {
            setLoading(false);
        }
    };

    // ================= UI =================
    return (
        <div className={className}>
            <div className={styles.row1}>
                <div className={styles.form}>
                    <div className={styles.field}>
                        <label>Số ngày bạn muốn đi</label>
                        <input
                            type="number"
                            min="1"
                            value={days}
                            onChange={(e) => setDays(Number(e.target.value))}
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Số tiền bạn muốn chi (triệu đồng)</label>
                        <input
                            type="number"
                            min="1"
                            value={budget}
                            onChange={(e) => setBudget(Number(e.target.value))}
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.field}>
                        <label>Nơi bạn bắt đầu</label>
                        <input
                            type="text"
                            value={startPlace}
                            onChange={(e) => setStartPlace(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={onSubmit}
                        className={styles.ReqCreating}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className={styles.spinner}></span>
                                Đang tạo tour...
                            </>
                        ) : (
                            "Tạo hành trình"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
