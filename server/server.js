import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./Routers/userRouter.js";
import connection from "./config/database.js";
import axios from "axios";
import openAI from "openai";
dotenv.config();
import aiRoute from "./Routers/AiRouter.js";
const app = express();
const PORT = process.env.PORT || 8081;
import userRouter from "./Routers/userRouter.js";
import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/v1/api", userRouter);
app.use("/v1/api", aiRoute);
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
