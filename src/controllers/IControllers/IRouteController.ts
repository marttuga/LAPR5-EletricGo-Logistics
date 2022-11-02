import { Request, Response, NextFunction } from 'express';

export default interface IRouteController  {
  get(req: Request, res: Response, next: NextFunction): void;
  createRoute(req: Request, res: Response, next: NextFunction);
  updateRoute(req: Request, res: Response, next: NextFunction);
  getRouteId(req: Request, res: Response, next: NextFunction);
}