import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import IRouteDTO from "../dto/IRouteDTO";

import { Route } from "../domain/route";
import { RouteId } from "../domain/routeId";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import RouteRepo from "../repos/routeRepo";
import { IRoutePersistence } from '../dataschema/IRoutePersistence';
import { Document } from 'mongodb';
import { Model } from 'mongoose';


export class RouteMap extends Mapper<Route> {

  public static toDTO( route: Route): IRouteDTO {
    return {
      //id: Route.id.toString(),
      routeId: route.routeId.routeId,
      distance: route.distance.distance,
      routeTime: route.routeTime.routeTime,
      batteryWaste: route.batteryWaste.batteryWaste,
      arrivalId: route.arrivalId,
      departureId: route.departureId,
      extraTime: route.extraTime.extraTime,
    } as IRouteDTO;
  }

  public static toDomain (raw: any | Model < IRoutePersistence & Document >): Route{
    const routeOrError = Route.create(raw, new UniqueEntityID(raw.domainId));

    
    // const repo = Container.get(RouteRepo);
    // const routeId = await repo.findByRouteId(raw.routeId);

    // const RouteOrError = Route.create({
    //   routeId: raw.routeId.routeId,
    //   distance: raw.distance,
    //   routeTime: raw.routeTime,
    //   batteryWaste: raw.batteryWaste,
    //   arrivalId: raw.arrivalId,
    //   departureId: raw.departureId,
    //   extraTime: raw.extraTime
    // }, new UniqueEntityID(raw.routeId))

    routeOrError.isFailure ? console.log(routeOrError.error) : '';
    
    return routeOrError.isSuccess ? routeOrError.getValue() : null;
  }

  public static toPersistence (Route: Route): any {
    const a = {
      domainId: Route.id.toString(),
      routeId: Route.routeId.routeId,
      distance: Route.distance.valueOf,
      routeTime: Route.routeTime.valueOf,
      batteryWaste: Route.batteryWaste.valueOf,
      arrivalId: Route.arrivalId,
      departureId: Route.departureId,
      extraTime: Route.extraTime.valueOf
    }
    return a;
  }
}