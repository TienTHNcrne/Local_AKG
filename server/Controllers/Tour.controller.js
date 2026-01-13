/** @format */

import {
    Tours,
    historyTour,
    getHistoryTour,
} from "../services/Tour.service.js";
const Tour = async (req, res) => {
    try {
        const prompt = req.body.prompt;
        console.log("oke", prompt);
        const bruh = await Tours(prompt);
        const response = bruh.data.choices[0].message.content;
        const id = req.headers.userid;
        await historyTour({ userId: id, prompt, response });
        const kq = response.replace(/\n{3,}/g, "\n\n").trim();

        return res.status(bruh.status).json(kq);
    } catch (error) {
        console.error("Lỗi gọi AI:", error.message);
        return res.status(500).json({ error: "Lỗi server" });
    }
};
const getHic = async (req, res) => {
    try {
        const result = await getHistoryTour({ userId: req.body.userId });
        return res.status(result.status).json(result.result.content);
    } catch (err) {
        return res.status(500).json({ error: "Lỗi server" });
    }
};
export { Tour, getHic };
