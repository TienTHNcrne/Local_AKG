// routes/aiRoute.js
import express from "express";
import FL from "../Controllers/Find.Controller.js";
const router = express.Router();

router.get("/find", FL);
export default router;
