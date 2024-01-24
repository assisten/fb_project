import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import randomString from "randomstring";
import { sendEmail } from "../utils/mail.util";
import  Jwt  from "jsonwebtoken";

// Login controller
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the username exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = Jwt.sign({ userId: user._id }, "secretkey");


    res.status(200).json({ message: "User logged in successfully",token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Register controller
const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Forget Password controller
const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Check if the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const resetIdentifier = randomString.generate();
    const hashedResetIdentifier = await bcrypt.hash(resetIdentifier, 10);
    user.password = hashedResetIdentifier;
    await user.save();
    sendEmail(
      email,
      "Password Reset",
      `Your new password is: ${resetIdentifier}`
    );

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { loginUser, registerUser, forgetPassword };
