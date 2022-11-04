import { Repo } from '../../core/infra/Repo';
import { Route } from '../../domain/route/route';
import { RouteId } from '../../domain/route/routeId';

export default interface IRouteRepo extends Repo<Route> {
  getAll(): Promise<Route[]>;
  save(route: Route): Promise<Route>;
  findByRouteId(RouteId: RouteId | string): Promise<Route>;
}
