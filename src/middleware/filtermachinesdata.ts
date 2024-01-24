// // middleware.ts
// import { Request, Response, NextFunction } from 'express';
// import Machine from '../models/machine.model';

// const filterByDateMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const dateParam = req.params.date;

//     if (dateParam) {
//       // If date parameter is provided, filter machines based on the date
//       const filteredMachines = await Machine.find({
//         time: {
//           $gte: new Date(`${dateParam}T00:00:00.000Z`),
//           $lt: new Date(`${dateParam}T23:59:59.999Z`),
//         },
//       });

//       // Attach filtered machines to the request object
//       req.filteredMachines = filteredMachines;
//     }

//     // Continue to the next middleware or route handler
//     next();
//   } catch (error) {
//     // Handle errors
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//     });
//   }
// };

// export default filterByDateMiddleware;
