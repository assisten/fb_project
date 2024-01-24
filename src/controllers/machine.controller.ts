import { Request,Response} from "express";
import Machine from "../models/machine.model";



const createMachine = async (req:Request,res:Response) =>{
    try {
        const newMachine = await Machine.create(req.body);
        res.status(200).json({
            success : true,
            message:"machine created succsesfully",
            data : newMachine
        })        
    } catch (error) {
        res.status(404).json({
            success : false,
            message : "machine not created"
        })
    }

}

  const findMachines = async (req:Request, res:Response) => {
    try {
       const getMachines = await Machine.find();
        return res.status(200).json({
          success: true,
          data: getMachines,
        });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };

export {createMachine,findMachines};