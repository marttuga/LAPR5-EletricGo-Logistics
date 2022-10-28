import { Request, Response, NextFunction } from 'express';

export default interface IRouteController  {
  createRoute(req: Request, res: Response, next: NextFunction);
  updateRoute(req: Request, res: Response, next: NextFunction);
}