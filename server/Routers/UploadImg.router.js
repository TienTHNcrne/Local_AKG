/** @format */

import express from "express";

import upload from "../Middlewares/Upload.middleware";
import { UploadImg } from "../Controllers/UploadImg.Controller";
const router = express.Router();

router.post("/upload", upload.array("img", 10), UploadImg);
