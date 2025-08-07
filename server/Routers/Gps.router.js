// routes/aiRoute.js
import express from "express";
import { Gps, GpsFind, getAll } from "../Controllers/Gps.Controller.js";
import upload from "../Middlewares/Upload.middleware.js";
const router = express.Router();

router.post("/gps", Gps);
router.get("/gps/find", GpsFind);
router.get("/gps/all", getAll);
export default router;
