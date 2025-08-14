/** @format */

import express from "express";

import {
	removedPlan,
	Create,
	GetPlan,
} from "../Controllers/Plan.controller.js";
const route = express.Router();
route.post("/plan/Create", Create);
route.post("/plan/GetAll", GetPlan);
route.post("/plan/remove", removedPlan);
export default route;
