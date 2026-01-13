/** @format */

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { EventEmitter } from "events";

import connection from "./config/database.js";
import { connectRedis, client as redisClient } from "./config/redis.js";
import weatherJob from "./jobs/weather.jobs.js";

// Routers
import userRouter from "./Routers/user.router.js";
import FindRouter from "./Routers/Find.router.js";
import Festival from "./Routers/Festival.router.js";
import aiRoute from "./Routers/Ai.router.js";
import router from "./Routers/SetUpRouter.router.js";
import Food from "./Routers/Food.router.js";
import GpsRouter from "./Routers/Gps.router.js";
import UploadImg from "./Routers/UploadImg.router.js";
import weather from "./Routers/Weather.router.js";
import PlaceLove from "./Routers/PlaceLove.router.js";
import Tours from "./Routers/Tour.router.js";
import Rate from "./Routers/Rate.router.js";
import Plan from "./Routers/Plan.router.js";
import Check from "./Routers/Check.router.js";
const app = express();
const PORT = process.env.PORT || 8081;

// EventEmitter setup
EventEmitter.defaultMaxListeners = 20;

// Middleware
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// Routes
app.use("/v2/api", router);
app.use("/v2/api", weather);
app.use("/v2/api", UploadImg);
app.use("/v2/api", Check);
app.use("/v1/api", userRouter);
app.use("/v1/api", Food);
app.use("/v1/api", aiRoute);
app.use("/v1/api", Tours);
app.use("/v1/api", Plan);
app.use("/v1/api", Rate);
app.use("/v1/api", FindRouter);
app.use("/v1/api", GpsRouter);
app.use("/v1/api", Festival);
app.use("/v1/api", PlaceLove);

// Health check
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Start jobs
weatherJob();

// Start server
(async () => {
    try {
        await connection();
        await connectRedis();

        // Redis test
        await redisClient.set("test_key", "Hello Redis!");
        const value = await redisClient.get("test_key");
        console.log("Redis test value:", value);

        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect:", error);
    }
})();
