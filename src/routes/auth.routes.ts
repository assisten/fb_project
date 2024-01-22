import express from "express";
import {
  loginUser,
  registerUser,
  forgetPassword,
} from "../controllers/auth.controller";

const router = express.Router();

// Route for user registration
router.post("/register", registerUser);

// Route for user authentication
router.post("/login", loginUser);

// Route for user authentication
router.post("/forgetPassword", forgetPassword);

export default router;
