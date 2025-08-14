/** @format */

// routes/aiRoute.js
import express from "express";
import { Tour, getHic } from "../Controllers/Tour.controller.js";
const router = express.Router();

router.post("/tour", Tour);
router.post("/historicTour", getHic);
export default router;
