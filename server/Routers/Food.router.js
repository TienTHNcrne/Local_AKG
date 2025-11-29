import express from "express";
import multer from "multer";
import {
    CreateFoodController,
    getAllFoodController,
} from "../Controllers/Food.controller.js";

const router = express.Router();
const upload = multer();

router.get("/food/GetAll", getAllFoodController);

router.post("/food/create", upload.array("images", 20), CreateFoodController);

export default router;
