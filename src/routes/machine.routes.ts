import  express  from "express";
const router = express.Router();
import { createMachine,findMachines } from "../controllers/machine.controller";

router.post("/create",createMachine);
router.get("/",findMachines);
export default router;


/**
 * GET POST PUT DELETE
 * GET localhost:3000/api/machine
 * POST localhost:3000/api/machine
 * DELETE localhost:3000/api/machine/4
 * PUT localhost:3000/api/machine/4
 * 
 * */ 
