/** @format */

import Groq from 'groq-sdk';
import CheckModel from '../Models/Check.model.js';
import GpsModel from '../Models/Gps.model.js';
const AiCheck = async ({ name, lat, lng, description }) => {
    try {
        const groq = new Groq({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const result = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: `Bạn là AI kiểm tra địa điểm du lịch tại Việt Nam.
Hãy xác định xem địa điểm được mô tả có phải là một nơi du lịch thực tế hay không.
Nếu là di tích, danh lam thắng cảnh, khu du lịch, bãi biển, chùa, núi, điểm tham quan... thì trả về "allow".
Nếu là địa điểm dân cư, cửa hàng nhỏ, địa chỉ cá nhân hoặc không phải nơi du lịch thì trả về "reject".
Chỉ trả về đúng một từ: "allow" hoặc "reject".`,
                },
                {
                    role: 'user',
                    content: `${name} [${lat}, ${lng}] - ${description}`,
                },
            ],
            temperature: 0.2,
            max_tokens: 10,
        });

        const answer = result.choices[0].message.content.trim().toLowerCase();
        return answer === 'allow' ? 'allow' : 'reject';
    } catch (err) {
        console.error('AI Check Error:', err.message);
        return 'reject';
    }
};

const CheckList = async ({
    lat,
    lng,
    name,
    category,
    description,
    time,
    img,
}) => {
    try {
        const decision = await AiCheck({ name, lat, lng, description });
        const exists = await GpsModel.findOne({ name, lat, lng });
        if (exists) return { status: 409, message: 'Địa điểm đã tồn tại.' };
        let status = '';
        if (decision === 'allow') {
            status = 'allow';
            const newData = new CheckModel({
                name,
                category,
                description,
                lat,
                lng,
                time,
                img,
                status,
            });
            await newData.save();
            return {
                status: 200,
                message: '✅ Địa điểm hợp lệ, đã lưu vào cơ sở dữ liệu.',
            };
        } else {
            status = 'reject';
            const newData = new CheckModel({
                name,
                category,
                description,
                lat,
                lng,
                time,
                img,
                status,
            });
            await newData.save();
            return {
                status: 400,
                message: '❌ Địa điểm không phải khu du lịch, bị từ chối.',
            };
        }
    } catch (err) {
        console.error('CheckList Error:', err.message);
        return {
            status: 500,
            message: 'Lỗi trong quá trình kiểm tra địa điểm.',
            error: err.message,
        };
    }
};

const Remove = async ({ lat, lng }) => {
    try {
        const c = await CheckModel.deleteOne({ lat, lng });
        return {
            status: 200,
            message: 'AC',
        };
    } catch (err) {
        console.error('CheckList Error:', err.message);
        return {
            status: 500,
            message: 'Lỗi trong quá trình kiểm tra địa điểm.',
            error: err.message,
        };
    }
};

export { CheckList, Remove };
