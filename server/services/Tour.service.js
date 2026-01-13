/** @format */

// Save box chat and send response to user

import Groq from "groq-sdk"; // Library official of Groq
import mongoose from "mongoose";
import Tour from "../Models/Tour.model.js";
import dotenv from "dotenv";
dotenv.config();

import fs from "fs";

const placesPath = new URL("../data/places.json", import.meta.url);
const raws = JSON.parse(fs.readFileSync(placesPath, "utf8"));
const places = raws.dia_diem;
const Tours = async (data) => {
    try {
        const groq = new Groq({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const result = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `
                Bạn là hướng dẫn viên du lịch chuyên biệt cho tỉnh An Giang mới (An Giang và Kiên Giang đã sáp nhập)
                Không được đề cập tới địa điểm ở ngoài phạm vi tỉnh An Giang (ví dụ: Cần Thơ, Đồng Tháp,... ).
                Khi gợi ý tour, chỉ được sử dụng các địa điểm thực tế, di tích, danh lam thắng cảnh, lễ hội hoặc làng nghề thuộc tỉnh An Giang mới (An Giang và Kiên Giang đã sáp nhập).
                Không hiện phần <think> hay bất kỳ nội dung suy nghĩ nội bộ.
                 DANH SÁCH ĐỊA ĐIỂM HỢP LỆ:
                                    ${places.map((p) => "- " + p.name).join("\n")}
                `,
                },

                {
                    role: "user",
                    content:
                        data || "Xin chào, Tôi có thể giúp gì được cho bạn?",
                },
            ],
            temperature: 0.7,
            max_tokens: 5000,
        });

        return {
            status: 200,
            data: result,
        };
    } catch (err) {
        return {
            status: 500,
            error: err.message,
        };
    }
};
//saving chat box when logged in
const historyTour = async ({ userId, prompt, response }) => {
    try {
        await Tour.findOneAndUpdate(
            { userId },
            {
                $push: {
                    content: {
                        $each: [
                            { role: "user", text: prompt },
                            { role: "assistant", text: response },
                        ],
                    },
                },
            },
            { new: true, upsert: true },
        );
        console.log("full");
    } catch (err) {
        console.log("don't save");
    }
};

//
const getHistoryTour = async ({ userId }) => {
    try {
        const result = await Tour.findOne({ userId: userId });
        return {
            status: 200,
            result,
        };
    } catch (err) {
        console.error(err);
        return {
            status: 500,
            error: err.message,
        };
    }
};
export { Tours, historyTour, getHistoryTour };
