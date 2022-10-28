import { Repo } from "../../core/infra/Repo";
import { Route } from "../../domain/route";
import { RouteId } from "../../domain/routeId";

export default interface IRouteRepo extends Repo<Route> {
	save(Route: Route): Promise<Route>;
	findByRouteId (RouteId: RouteId | number): Promise<Route>;
}
  