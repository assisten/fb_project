import  express  from "express";
const router = express.Router();
import { createMachine,findMachines } from "../controllers/machine.controller";

router.post("/machine",createMachine);
router.get("/machines",findMachines);
export default router;
