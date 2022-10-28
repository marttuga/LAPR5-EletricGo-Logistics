import { Result } from "../../core/logic/Result";
import IRouteDTO from "../../dto/IRouteDTO";

export default interface IRouteService  {
  createRoute(routeDTO: IRouteDTO): Promise<Result<IRouteDTO>>;
  updateRoute(routeDTO: IRouteDTO): Promise<Result<IRouteDTO>>;

  getRouteId (routeId: number): Promise<Result<IRouteDTO>>;
}
