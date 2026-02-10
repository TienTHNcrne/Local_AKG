/** @format */

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";
import { EventEmitter } from "events";

import connection from "./config/database.js";
import { connectRedis, client as redisClient } from "./config/redis.js";
import weatherJob from "./jobs/weather.jobs.js";

// Routers
import Auth from "./Routers/Auth.router.js";
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
EventEmitter.defaultMaxListeners = 20;

// ===== Middleware cơ bản =====
app.use(
    cors({
        origin: "https://agiland.vn.info.vn",
        credentials: true,
    }),
);
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// ===== SESSION + PASSPORT (PHẢI ĐẶT TRƯỚC ROUTES) =====
app.use(
    session({
        secret: "secret123",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        },
    }),
);

// Initialize Passport (requires session middleware to be configured first)
app.use(passport.initialize());
app.use(passport.session());

// ===== API ROUTES =====
app.use("/v2/api", router);
app.use("/v2/api", weather);
app.use("/v2/api", UploadImg);
app.use("/v2/api", Check);

app.use("/v1/api", Auth);
app.use("/v1/api", Food);
app.use("/v1/api", aiRoute);
app.use("/v1/api", Tours);
app.use("/v1/api", Plan);
app.use("/v1/api", Rate);
app.use("/v1/api", FindRouter);
app.use("/v1/api", GpsRouter);
app.use("/v1/api", Festival);
app.use("/v1/api", PlaceLove);

// ===== HEALTH =====
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// ===== JOBS =====
weatherJob();

// ===== START =====
(async () => {
    try {
        await connection();
        await connectRedis();

        await redisClient.set("test_key", "Hello Redis!");
        console.log("Redis test:", await redisClient.get("test_key"));

        app.listen(PORT, () => {
            console.log(`Server running: http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect:", err);
    }
})();
