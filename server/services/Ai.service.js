/** @format */

// Save box chat and send response to user

import Groq from 'groq-sdk'; // Library official of Groq
import mongoose from 'mongoose';
import HistoricAI from '../Models/Historic_AI.model.js';
import dotenv from 'dotenv';
dotenv.config();

const AI = async data => {
    try {
        const groq = new Groq({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const result = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: ` Bạn là hướng dẫn viên du lịch chuyên biệt cho tỉnh An Giang mới (An Giang và Kiên Giang đã sáp nhập)
                    Nhiệm vụ:
                    1. Nếu được đưa tên một địa điểm, hãy mô tả súc tích, dễ hiểu, dưới 200 từ, nêu rõ nét đặc trưng, văn hóa và điểm nổi bật.
                    2. Nếu người dùng hỏi về thông tin khác, hãy trả lời tự nhiên, chính xác và thân thiện.
                    Quy tắc:
                    - Luôn trả lời bằng tiếng Việt, và chính xác nhất có thể.
                    - Không liệt kê quá khô khan, hãy viết như đang trò chuyện.
                    - Nếu không chắc chắn, nói rõ điều đó thay vì đoán.cung cấp danh sách địa điểm chính xác`,
                },
                {
                    role: 'user',
                    content:
                        data || 'Xin chào, Tôi có thể giúp gì được cho bạn?',
                },
            ],
            temperature: 0.7,
            max_tokens: 1024,
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
const history = async ({ userId, prompt, response }) => {
    try {
        await HistoricAI.findOneAndUpdate(
            { userId },
            {
                $push: {
                    content: {
                        $each: [
                            { role: 'user', text: prompt },
                            { role: 'assistant', text: response },
                        ],
                    },
                },
            },
            { new: true, upsert: true }
        );
        console.log('full');
    } catch (err) {
        console.log("don't save");
    }
};

//
const getHistory = async ({ userId }) => {
    try {
        console.log('FINDING HISTORY FOR:', userId);

        const result = await HistoricAI.findOne({ userId: userId });
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
export { AI, history, getHistory };
