// routes/aiRoute.js
import express from "express";
import { Gps, GpsFind, getAll } from "../Controllers/GpsController.js";
const router = express.Router();

router.get("/gps", Gps);
router.get("/gps/find", GpsFind);
router.get("/gps/all", getAll);
export default router;
