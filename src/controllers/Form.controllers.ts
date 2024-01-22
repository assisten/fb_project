import { Request, Response } from "express";
import userlogins from "../models/Form.model";
import  Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserLogins = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;
    const secertkey = "abdullah123"
    const existemail = await userlogins.findOne({ Email });
    if (existemail) {
      res.status(500).json({
        error: "User already exists with this email",
      });
    }
    const hashpassword = await bcrypt.hash(Password, 10);
    const savedlogins = new userlogins({
      Email,
      Password:hashpassword
    });
    const token = Jwt.sign({ userId: savedlogins._id }, secertkey);
    await savedlogins.save();
    
    res.status(200).json({
      message: "User Logged In Successfully",
      savedlogins,
      token
    });
  } catch (e) {
    res.status(500).json({
      message: "cannot login",
      error: e,
    });
  }
};

export { UserLogins };
