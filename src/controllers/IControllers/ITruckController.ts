import { Request, Response, NextFunction } from 'express';

export default interface ITruckController  {
  createTruck(req: Request, res: Response, next: NextFunction);
  updateTruck(req: Request, res: Response, next: NextFunction);
}