import { Router } from "express";
import { resetPassword } from "../controllers/FormEmailControllers";
const router = Router();


router.post("/Email",resetPassword);

export default router;