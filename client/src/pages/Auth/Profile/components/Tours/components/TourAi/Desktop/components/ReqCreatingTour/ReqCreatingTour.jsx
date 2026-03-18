/** @format */
import React, { useMemo, useState } from "react";
import styles from "./ReqCreatingTour.module.scss";
import { useTour } from "../../../Contexts/useTour";
import { useAuth } from "../../../../../../../../../../Contexts/Auth/Auth";
import axios from "axios";
import { toast } from "react-toastify";

export default React.memo(function ReqCreatingTour({ className }) {
    const {
        days,
        setDays,
        budget,
        setBudget,
        startPlace,
        setStartPlace,
        loading,
        setLoading,
        lovePlaces,
        setChatPresent,
    } = useTour();

    const [customPrompt, setCustomPrompt] = useState("");
    const { user } = useAuth();

    const buildPrompt = () => {
        if (customPrompt.trim()) return customPrompt.trim();

        const places =
            lovePlaces.size > 0
                ? [...lovePlaces.keys()].map((v) => v.split(",")[0]).join(", ")
                : null;

        const base = places
            ? `Tôi muốn đi du lịch các địa điểm: ${places}. `
            : "Tạo tôi 1 hành trình du lịch An Giang. ";

        return (
            base +
            `| Số ngày: ${days} ngày | Ngân sách: ${budget} triệu đồng | Xuất phát từ: ${startPlace}`
        );
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

    const onSubmit = async () => {
        if (!isFormValid) {
            toast.error(
                "Vui lòng nhập đầy đủ thông tin hoặc viết prompt tùy chỉnh",
            );
            return;
        }
        if (!user?.userId) {
            toast.error("Bạn chưa đăng nhập");
            return;
        }

        try {
            setLoading(true);
            const prompt = buildPrompt();
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

    return (
        <div className={className}>
            <div className={styles.form}>
                {/* Nhóm: thông tin cơ bản */}
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label className={styles.label}>Số ngày</label>
                        <input
                            type="number"
                            min="1"
                            value={days}
                            onChange={(e) => setDays(Number(e.target.value))}
                            disabled={loading}
                            className={styles.input}
                            placeholder="3"
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>
                            Ngân sách (triệu)
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={budget}
                            onChange={(e) => setBudget(Number(e.target.value))}
                            disabled={loading}
                            className={styles.input}
                            placeholder="5"
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Nơi bắt đầu</label>
                    <input
                        type="text"
                        value={startPlace}
                        onChange={(e) => setStartPlace(e.target.value)}
                        disabled={loading}
                        className={styles.input}
                        placeholder="Chọn điểm trên bản đồ hoặc nhập tay..."
                    />
                </div>

                <hr className={styles.divider} />

                {/* Nhóm: prompt tùy chỉnh */}
                <div className={styles.field}>
                    <label className={styles.label}>
                        Prompt tùy chỉnh
                        <span className={styles.optional}>tùy chọn</span>
                    </label>
                    <textarea
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        placeholder="Viết prompt của bạn để tạo hành trình du lịch..."
                        disabled={loading}
                        rows={3}
                        className={styles.textarea}
                    />
                </div>

                {/*  submit */}
                <button
                    type="button"
                    onClick={onSubmit}
                    className={styles.submitBtn}
                    disabled={!isFormValid || loading}
                >
                    {loading ? (
                        <>
                            <span className={styles.spinner} />
                            Đang tạo...
                        </>
                    ) : (
                        <>
                            <span className={styles.btnIcon}>✦</span>
                            Tạo hành trình
                        </>
                    )}
                </button>
            </div>
        </div>
    );
});
