/** @format */

// routes/Find.js
import express from "express";
import { TradeToAddres, FL } from "../Controllers/Find.Controller.js";
const router = express.Router();

router.get("/find", FL);
router.post("/TradePosToAdd", (req, res) => {
    res.json({ message: "TradePosToAdd router OK" });
});
export default router;
