 import {NextFunction, Request, Response} from 'express';

export default interface IFleetPlaningController {
	getBestRoute(req: Request, res: Response, next: NextFunction);

	getNearestWarehouse(req: Request, res: Response, next: NextFunction);

	getRouteGreaterMass(req: Request, res: Response, next: NextFunction);

	getRouteBestRelation(req: Request, res: Response, next: NextFunction);
	
	createPlaning(req: Request, res: Response, next: NextFunction);
} 