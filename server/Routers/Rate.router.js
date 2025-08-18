/** @format */

import { getAll, CreateRate } from "../Controllers/Rate.controller.js";
import express from "express";
const router = express.Router();
router.post("/rate/create", CreateRate);
router.post("/rate/getAll", getAll);

export default router;
