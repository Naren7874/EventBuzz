import express from "express";
const router = express.Router();
import authController from '../controllers/authController.js';

router.post("/get-otp" , authController.sendOtp);


export default router;
