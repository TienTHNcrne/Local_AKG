/** @format */
// routes/aiRoute.js
import express from 'express';
import { RemoveE, getAll } from '../Controllers/Check.Controller.js';
const router = express.Router();
router.get('/checkAll', getAll);
router.get('/RemoveCheck', RemoveE);
export default router;
