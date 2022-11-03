import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import IRouteDTO from "../dto/IRouteDTO";

import { Route } from "../domain/route";
import { RouteId } from "../domain/routeId";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import RouteRepo from "../repos/routeRepo";


export class RouteMap extends Mapper<Route> {

  public static toDTO( route: Route): IRouteDTO {
    return {
      //id: Route.id.toString(),
      routeId: route.routeId.routeId,
      distance: route.distance,
      routeTime: route.routeTime,
      batteryWaste: route.batteryWaste,
      arrivalId: route.arrivalId,
      departureId: route.departureId,
      extraTime: route.extraTime
    } as IRouteDTO;
  }

  public static async toDomain (raw: any): Promise<Route> {
    const repo = Container.get(RouteRepo);
    const routeId = await repo.findByRouteId(raw.routeId);

    const RouteOrError = Route.create({
      routeId: raw.routeId.routeId,
      distance: raw.distance,
      routeTime: raw.routeTime,
      batteryWaste: raw.batteryWaste,
      arrivalId: raw.arrivalId,
      departureId: raw.departureId,
      extraTime: raw.extraTime
    }, new UniqueEntityID(raw.routeId))

    RouteOrError.isFailure ? console.log(RouteOrError.error) : '';
    
    return RouteOrError.isSuccess ? RouteOrError.getValue() : null;
  }

  public static toPersistence (Route: Route): any {
    const a = {
      domainId: Route.id.toString(),
      routeId: Route.routeId.routeId,
      distance: Route.distance,
      routeTime: Route.routeTime,
      batteryWaste: Route.batteryWaste,
      arrivalId: Route.arrivalId,
      departureId: Route.departureId,
      extraTime: Route.extraTime
    }
    return a;
  }
}