import { Router } from "express";
import { userlog } from "../fbcontrollers/fbcontrollers";
const router = Router();


router.post("/login",userlog);
export default router;