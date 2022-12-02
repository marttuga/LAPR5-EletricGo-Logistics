import { Request, Response, NextFunction } from 'express';

export default interface IRouteController  {
  getRoute(req: Request, res: Response, next: NextFunction);
  createRoute(req: Request, res: Response, next: NextFunction);
  updateRoute(req: Request, res: Response, next: NextFunction);
  getRouteId(req: Request, res: Response, next: NextFunction);
  postSGRAIRoutes(req: Request, res: Response, next: NextFunction);
}