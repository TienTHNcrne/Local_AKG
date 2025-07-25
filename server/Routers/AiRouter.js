// routes/aiRoute.js
import express from "express";
import { ai, getHic } from "../Controllers/AiController.js";
const router = express.Router();

router.post("/ai", ai);
router.post("/historicAI", getHic);
export default router;
