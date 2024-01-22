import { Router } from "express";
import { UserLogins } from "../controllers/Form.controllers";
const router = Router();

router.post("/login", UserLogins);


export default router;
