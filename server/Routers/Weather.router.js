/** @format */

import { weatherSum, wetherCur } from "../Controllers/Weather.controller.js";
import express from "express";
const router = express.Router();

router.get("/weather/current", wetherCur);
router.get("/weather/summary", weatherSum);

export default router;
