/** @format */

import Groq from 'groq-sdk';
import mongoose from 'mongoose';
import HistoricAI from '../Models/Historic_AI.model.js';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
import fs from 'fs';

const placesPath = new URL('../data/places.json', import.meta.url);
const places = JSON.parse(fs.readFileSync(placesPath, 'utf8'));

const AI = async places => {
    try {
        const groq = new Groq({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const result = await groq.chat.completions.create({
            model: 'llama-3.3-70b-instant',
            messages: [
                {
                    role: 'system',
                    content: `
                    Bạn là hướng dẫn viên du lịch chuyên biệt cho tỉnh An Giang mới (An Giang + Kiên Giang đã sáp nhập).

                    Dữ liệu địa điểm hợp lệ của bạn nằm trong biến "places" dưới đây. 
                    ⚠️ Bạn CHỈ được sử dụng tên các địa điểm có trong danh sách này, không tự tạo thêm.
                    Nếu người dùng hỏi một địa điểm không có trong danh sách, phải trả lời:
                    "Rất tiếc, địa điểm này không nằm trong danh sách du lịch chính thức của An Giang mới."

                    DANH SÁCH ĐỊA ĐIỂM HỢP LỆ:
                    ${places.map(p => '- ' + p.name).join('\n')}

                    Nhiệm vụ:
                    1. Nếu được đưa một tên địa điểm (đúng với danh sách), mô tả ngắn gọn < 200 từ:
                    - Giọng nói tự nhiên, thân thiện như người thật
                    - Nêu đặc trưng, văn hoá, cảnh đẹp
                    2. Nếu người dùng hỏi thông tin khác (không phải mô tả địa điểm), trả lời tự nhiên bằng tiếng Việt.

                    Quy tắc:
                    - Không được liệt kê khô khan
                    - Không được thêm địa điểm không có trong danh sách
                    - Nếu không chắc chắn, nói rõ: "Tôi không chắc về thông tin này."
                    `,
                },
                {
                    role: 'user',
                    content:
                        places || 'Xin chào, Tôi có thể giúp gì được cho bạn?',
                },
            ],
            temperature: 0.7,
            max_tokens: 1024,
        });

        return {
            status: 200,
            places: result,
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
