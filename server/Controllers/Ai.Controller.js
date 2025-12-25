/** @format */

import { history, AI, getHistory } from "../services/Ai.service.js";
const ai = async (req, res) => {
	try {
		const prompt = req.body.prompt;

		const bruh = await AI(prompt);
		const response = bruh.data.choices[0].message.content;
		const id = req.headers.userid;
		await history({ userId: id, prompt, response });
		return res.status(bruh.status).json(bruh.data);
	} catch (error) {
		console.error("Lỗi gọi AI:", error.message);
		return res.status(500).json({ error: "Lỗi server" });
	}
};
const getHic = async (req, res) => {
	try {
		const result = await getHistory({ userId: req.body.userId });
		console.log(result);
		return res.status(result.status).json(result.result.content);
	} catch (err) {
		return res.status(500).json({ error: "Lỗi server" });
	}
};
export { ai, getHic };
