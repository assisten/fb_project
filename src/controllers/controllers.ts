import { Request, Response } from "express";
import userlogins from "../fbmodels/fbmodeschema";
// import  Jwt  from "jsonwebtoken";
// import bcrypt from "bcrypt";
const userlog = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;
    const existemail = await userlogins.findOne({ Email });
    if (existemail) {
      res.status(500).json({
        error: "User already exists with this email",
      });
    }
    const savedlogins = new userlogins({
      Email,
      Password,
    });

    await savedlogins.save();
    res.status(200).json({
      message: "User Logged In Successfully",
      savedlogins,
    });
  } catch (e) {
    res.status(500).json({
      message: "cannot login",
      error: e,
    });
  }
};

export { userlog };
