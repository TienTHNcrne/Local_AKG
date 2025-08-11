/** @format */

import whether from "../Controllers/Weather.controller.js";
import express from "express";
const router = express.Router();

router.get("/weather", whether);
export default router;
