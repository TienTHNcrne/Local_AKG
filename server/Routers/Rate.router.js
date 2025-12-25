// routes/Rate.route.js
import express from "express";
import multer from "multer";
import { CreateRate, getAll } from "../Controllers/Rate.controller.js";

const router = express.Router();
const upload = multer();
router.post("/rate/create", upload.array("imgs", 20), CreateRate);
router.get("/rate/getAll", getAll);

export default router;
