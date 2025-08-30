import Create from "../Controllers/SetUpRouter.controller.js";
import express from "express";
const router = express.Router();
router.post("/router", Create);
export default router;
