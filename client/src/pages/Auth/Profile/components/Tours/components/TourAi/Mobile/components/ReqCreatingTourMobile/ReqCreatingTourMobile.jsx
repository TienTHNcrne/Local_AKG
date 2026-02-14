/** @format */

import React, { useMemo } from "react";
import styles from "./ReqCreatingTourMobile.module.scss";
import { useTour } from "../../../Contexts/useTour";
import axios from "axios";
import { toast } from "react-toastify";

export default function ReqCreatingTourMobile() {
    const {
        days,
        setDays,
        budget,
        setBudget,
        startPlace,
        setStartPlace,
        loading,
        setLoading,
        setChatPresent,
        lovePlaces,
    } = useTour();

    /* ================= CHECK FORM VALID ================= */
    const isFormValid = useMemo(() => {
        return (
            Number(days) > 0 &&
            Number(budget) > 0 &&
            typeof startPlace === "string" &&
            startPlace.trim().length > 0
        );
    }, [days, budget, startPlace]);

    /* ================= BUILD PROMPT ================= */
    const buildPrompt = () => {
        let prompt = "";

        if (lovePlaces && lovePlaces.size > 0) {
            const places = Array.from(lovePlaces.keys())
                .filter(Boolean)
                .map((name) => name.split(",")[0])
                .join(", ");

            prompt = places.length
                ? `Tôi muốn đi du lịch các địa điểm: ${places}. `
                : "Tạo tôi 1 hành trình du lịch An Giang. ";
        } else {
            prompt = "Tạo tôi 1 hành trình du lịch An Giang. ";
        }

        prompt += `| Số ngày: ${days} ngày | Ngân sách: ${budget} triệu đồng | Xuất phát từ: ${startPlace}`;

        return prompt;
    };

    /* ================= SUBMIT ================= */
    const onSubmit = async () => {
        if (!isFormValid || loading) return;

        try {
            const userId = localStorage.getItem("userid");
            if (!userId) {
                toast.error("Bạn chưa đăng nhập");
                return;
            }

            const prompt = buildPrompt();
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

    /* ================= UI ================= */
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                {/* DAYS */}
                <div className={styles.field}>
                    <label>Số ngày bạn muốn đi</label>
                    <input
                        type="number"
                        min="1"
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                        disabled={loading}
                        required
                    />
                </div>

                {/* BUDGET */}
                <div className={styles.field}>
                    <label>Số tiền bạn muốn chi (triệu đồng)</label>
                    <input
                        type="number"
                        min="1"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        disabled={loading}
                        required
                    />
                </div>

                {/* START PLACE */}
                <div className={styles.field}>
                    <label>Nơi bạn bắt đầu</label>
                    <input
                        type="text"
                        value={startPlace}
                        onChange={(e) => setStartPlace(e.target.value)}
                        disabled={loading}
                        required
                    />
                </div>

                {/* SUBMIT */}
                <button
                    type="button"
                    onClick={onSubmit}
                    className={styles.ReqCreating}
                    disabled={!isFormValid || loading}
                >
                    {loading ? (
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
    );
}
