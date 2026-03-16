/** @format */

import React, { useMemo, useState } from "react";
import styles from "./ReqCreatingTour.module.scss";
import { useTour } from "../../../Contexts/useTour";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../../../../../../../../Contexts/Auth/Auth";
export default React.memo(function ReqCreatingTour({ className }) {
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
        loading,
    } = useTour();

    const [customPrompt, setCustomPrompt] = useState("");
    const { user } = useAuth();
    const buildPrompt = () => {
        if (customPrompt.trim()) return customPrompt.trim();

        let prompt = "";
        if (lovePlaces.size > 0) {
            const places = [...lovePlaces.keys()]
                .map((v) => v.split(",")[0])
                .join(", ");
            prompt =
                places.length > 0
                    ? `Tôi muốn đi du lịch các địa điểm: ${places}. `
                    : "Tạo tôi 1 hành trình du lịch An Giang. ";
        } else {
            prompt = "Tạo tôi 1 hành trình du lịch An Giang. ";
        }

        prompt += `| Số ngày: ${days} ngày | Ngân sách: ${budget} triệu đồng | Xuất phát từ: ${startPlace}`;
        return prompt;
    };

    const onSubmit = async () => {
        try {
            console.log(days, budget, startPlace);
            if (!customPrompt.trim() && (!days || !budget || !startPlace)) {
                console.log("ple");
                toast.error(
                    "Vui lòng nhập đầy đủ thông tin hoặc viết prompt tùy chỉnh",
                );
                return;
            }

            if (!user.userId) {
                toast.error("Bạn chưa đăng nhập");
                return;
            }

            const prompt = buildPrompt();
            setLoading(true);
            console.log(prompt);

            const res = await axios.post(
                `${import.meta.env.VITE_BE_URL}/v1/api/tour`,
                { prompt },
                { headers: { UserId: user.userId } },
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

    const isFormValid = useMemo(() => {
        return (
            customPrompt.trim() ||
            (Number(days) > 0 &&
                Number(budget) > 0 &&
                typeof startPlace === "string" &&
                startPlace.trim().length > 0)
        );
    }, [days, budget, startPlace, customPrompt]);

    return (
        <div className={className}>
            <div className={styles.form}>
                <div className={styles.field}>
                    <label>Số ngày muốn đi</label>
                    <input
                        type="number"
                        min="1"
                        value={days}
                        onChange={(e) => setDays(Number(e.target.value))}
                        disabled={isLoading}
                    />
                </div>

                <div className={styles.field}>
                    <label>Ngân sách (triệu đồng)</label>
                    <input
                        type="number"
                        min="1"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        disabled={isLoading}
                    />
                </div>

                <div className={styles.field}>
                    <label>Nơi bắt đầu</label>
                    <input
                        type="text"
                        value={startPlace}
                        onChange={(e) => setStartPlace(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <hr className={styles.divider} />

                <div className={`${styles.field} ${styles.fieldTextarea}`}>
                    <label>Prompt tùy chỉnh (tùy chọn)</label>
                    <textarea
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        placeholder="Viết prompt của bạn để tạo hành trình du lịch..."
                        disabled={isLoading}
                        rows={4}
                    />
                </div>

                <button
                    type="button"
                    onClick={onSubmit}
                    className={styles.ReqCreating}
                    disabled={!isFormValid || loading}
                >
                    {isLoading ? (
                        <>
                            <span className={styles.spinner} />
                            Đang tạo tour...
                        </>
                    ) : (
                        "Tạo hành trình"
                    )}
                </button>
            </div>
        </div>
    );
});
