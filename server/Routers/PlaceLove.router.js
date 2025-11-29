/** @format */

import express from "express";

import {
	CreatePlace,
	GetAllPlace,
	GetPlace,
	RemoveP,
} from "../Controllers/PlaceLove.controller.js";
const route = express.Router();
route.post("/place/CreatePlace", CreatePlace);
route.post("/place/GetAll", GetAllPlace);
route.post("/place/FindPlace", GetPlace);
route.post("/place/remove", RemoveP);
export default route;
