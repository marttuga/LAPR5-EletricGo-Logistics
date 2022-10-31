import { Request, Response, NextFunction } from 'express';

export default interface ITruckController  {
  get(req: Request, res: Response, next: NextFunction): void;
  createTruck(req: Request, res: Response, next: NextFunction);
  updateTruck(req: Request, res: Response, next: NextFunction);
  getLicencePlate(req: Request, res: Response, next: NextFunction);
}