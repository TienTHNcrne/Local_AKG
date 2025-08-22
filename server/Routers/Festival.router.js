import express from "express";
import multer from "multer";
import {
    createFestivalController,
    getAllFestivalsController,
} from "../Controllers/Festival.controller.js";

const router = express.Router();
const upload = multer();

router.get("/festival/GetAll", getAllFestivalsController);

// cần upload.array để lấy req.files + req.body
router.post(
    "/festival/create",
    upload.array("images", 20),
    createFestivalController
);

export default router;
