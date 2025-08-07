/** @format */

// Save box chat and send response to user

import Groq from "groq-sdk"; // Library official of Groq
import mongoose from "mongoose";
import HistoricAI from "../Models/Historic_AI.model.js";
import dotenv from "dotenv";
dotenv.config();

const AI = async (data) => {
	try {
		const groq = new Groq({
			apiKey: process.env.OPENAI_API_KEY,
		});

		const result = await groq.chat.completions.create({
			model: "moonshotai/kimi-k2-instruct",
			messages: [
				{
					role: "user",
					content:
						data || "Xin chào, Tôi có thể giúp gì được cho bạn?",
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
const getHistory = async ({ userId }) => {
	try {
		console.log("FINDING HISTORY FOR:", userId);

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
