import { Request,Response} from "express";
import Machine from "../models/machine.model";


const createMachine = async (req: Request, res: Response) => {
  try {
      const { machine, production, watt_consumption, time, temperature, box } = req.body;

      const newMachine = new Machine({
          machine,
          production,
          watt_consumption,
          time,
          temperature,
          box
      });

      await newMachine.save();

      res.status(200).json({
          success: true,
          message: "Machine created successfully",
          data: newMachine
      });
  } catch (error) {
      res.status(404).json({
          success: false,
          message: "Machine not created",
      });
  }
};


  
const findMachines = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    console.log('Received startDate:', startDate);
    console.log('Received endDate:', endDate);

    const filter: any = {};
    if (startDate) {
      filter.time = { $gte: new Date(startDate as string) };
    }
    if (endDate) {
      filter.time = { ...filter.time, $lt: new Date(endDate as string) };
    }

    console.log('Filter:', filter);

    const filteredData = await Machine.find(filter);

    console.log('Filtered Data:', filteredData);

    res.status(200).json(filteredData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export {createMachine,findMachines};