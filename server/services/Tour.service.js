/** @format */

// Save box chat and send response to user

import Groq from "groq-sdk"; // Library official of Groq
import mongoose from "mongoose";
import Tour from "../Models/Tour.model.js";
import dotenv from "dotenv";
dotenv.config();

const Tours = async (data) => {
	try {
		const groq = new Groq({
			apiKey: process.env.OPENAI_API_KEY,
		});

		const result = await groq.chat.completions.create({
			model: "qwen/qwen3-32b",
			messages: [
				{
					role: "system",
					content: `Tỉnh An Giang hiện tại gồm Kiên Giang cũ và An Giang cũ.
					Bạn là 1 người tạo tour du lịch hay tạo 1 tour du lịch theo yêu cầu và thông tin phải chính xác nhất không đươc sai. Khong hiện phần <thìnk>
					cung cấp danh sách địa điểm chính xác`,
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
			{ new: true, upsert: true }
		);
		console.log("full");
	} catch (err) {
		console.log("don't save");
	}
};

//
const getHistoryTour = async ({ userId }) => {
	try {
		console.log("FINDING HISTORY FOR:", userId);

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
