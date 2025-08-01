// routes/aiRoute.js
import express from "express";
import { Gps, GpsFind } from "../Controllers/GpsController.js";
const router = express.Router();

router.get("/gps", Gps);
router.get("/gps/find", GpsFind);

export default router;
