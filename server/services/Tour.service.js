/** @format */
import Groq from "groq-sdk";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const placesPath = new URL("../data/places.json", import.meta.url);
const places = JSON.parse(fs.readFileSync(placesPath, "utf8"));

const Tours = async (data) => {
    try {
        const groq = new Groq({
            apiKey: process.env.OPENAI_API_KEY,
        });
        console.log(data);
        // Chuyển danh sách thành chuỗi văn bản chi tiết để làm "não" cho AI
        const knowledgeBase = places
            .map(
                (p) =>
                    `+ Địa danh: ${p.name}
              - Thuộc khu vực: ${p.khu_vuc}
              `,
            )
            .join("\n\n");

        const result = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `
                Bạn là hướng viên du lịch chuyên biệt cho tỉnh An Giang mới (An Giang và Kiên Giang đã sáp nhập).
                
                ⚠️ QUY TẮC CỐT LÕI:
                1. Chỉ sử dụng thông tin trong "DỮ LIỆU ĐỊA PHƯƠNG" dưới đây. Không dùng kiến thức cũ của bạn.
                2. Nếu người dùng hỏi về địa điểm cũ (ví dụ: Núi Sập), bạn phải tra cứu xem nó thuộc "Địa danh" nào và hiện nằm ở "Vị trí hành chính mới" nào (ví dụ: Xã Thoại Sơn).
                3. Tuyệt đối không nói sai vị trí (Ví dụ: Không được nói Núi Sập ở Tịnh Biên vì dữ liệu ghi rõ thuộc Thoại Sơn).
           

                DỮ LIỆU ĐỊA PHƯƠNG:

                ${knowledgeBase}
                TẠO 1 TOUR DU LỊCH ĐÚNG VỚI DỮ LIỆU VÀ YÊU CẦU CỦA NGƯỜI DÙNG
                `,
                },
                {
                    role: "user",
                    content:
                        data || "Xin chào, Tôi có thể giúp gì được cho bạn?",
                },
            ],
            temperature: 0.1,
            max_tokens: 2000,
        });
        return {
            status: 200,
            data: result.choices[0].message.content,
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
