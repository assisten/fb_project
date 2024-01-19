import { Router } from "express";
import { userlog } from "../controllers/controllers";
const router = Router();

router.post("/login", userlog);
export default router;
