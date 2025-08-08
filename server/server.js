/** @format */

import dotenv from "dotenv";
import FindRouter from "./Routers/Find.router.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./Routers/user.router.js";
import connection from "./config/database.js";
import axios from "axios";
import openAI from "openai";
dotenv.config();
import aiRoute from "./Routers/Ai.router.js";
const app = express();
const PORT = process.env.PORT || 8081;
import userRouter from "./Routers/user.router.js";
import { EventEmitter } from "events";
import GpsRouter from "./Routers/Gps.router.js";
import UploadImg from "./Routers/UploadImg.router.js";
EventEmitter.defaultMaxListeners = 20;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/v1/api", userRouter);
app.use("/v1/api", aiRoute);
app.use("/v1/api", FindRouter);
app.use("/v1/api", GpsRouter);
app.use("/v2/api", UploadImg);
app.get("/", (req, res) => {
	res.send("Backend is running!");
});
(async () => {
	try {
		await connection();
		app.listen(PORT, () => {
			console.log(` Server is running at http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error("Failed to connect:", error);
	}
})();
