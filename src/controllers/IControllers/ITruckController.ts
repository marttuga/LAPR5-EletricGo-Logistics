import { Request, Response, NextFunction } from 'express';

export default interface ITruckController  {
  getTrucks(req: Request, res: Response, next: NextFunction);
  getActiveTrucks(req: Request, res: Response, next: NextFunction);
  createTruck(req: Request, res: Response, next: NextFunction);
  updateTruck(req: Request, res: Response, next: NextFunction);
  getLicencePlate(req: Request, res: Response, next: NextFunction);
  changeStatustoInactive(req: Request, res: Response, next: NextFunction);
  changeStatustoActive(req: Request, res: Response, next: NextFunction);
  changeStatus(req: Request, res: Response, next: NextFunction)
}