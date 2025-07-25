import express from "express";
import { Register, Login } from "../Controllers/userController.js";
const route = express.Router();

route.post("/register", Register);
route.post("/Login", Login);

export default route;
