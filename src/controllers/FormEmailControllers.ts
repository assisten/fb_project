import { Request, Response } from "express";
import userlogins from "../models/Form.model";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import randomstring from "randomstring";

const gmailAppPassword = "dryz urlf xjiu aerm";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: "abdullahamjad7000@gmail.com",
    pass: gmailAppPassword,
  },
});

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { Email } = req.body;

    let user = await userlogins.findOne({ Email });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const resetIdentifier = randomstring.generate();
    const hashedResetIdentifier = await bcrypt.hash(resetIdentifier, 10);
    user.Password = hashedResetIdentifier;

    
    const mailOptions = {
      from: "abdullahamjad7000@gmail.com",
      to: user.Email,
      subject: "Password Reset",
      text: `your reset password is ${resetIdentifier}`,
    };
    await transporter.sendMail(mailOptions);
    await user.save();
    
    return res.status(200).json({
      message: "Password reset link sent, and user password updated",
    });
  } catch (e) {
    console.error("Error during password reset:", e);
    return res.status(500).json({
      message: "Cannot reset password",
    });
  }
};

export { resetPassword };
