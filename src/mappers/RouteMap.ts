import { Container } from 'typedi';

import { Mapper } from '../core/infra/Mapper';

import IRouteDTO from '../dto/IRouteDTO';

import { Route } from '../domain/route/route';
import { RouteId } from '../domain/route/routeId';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import RouteRepo from '../repos/routeRepo';
import { IRoutePersistence } from '../dataschema/IRoutePersistence';
import { Document } from 'mongodb';
import { Model } from 'mongoose';

export class RouteMap extends Mapper<Route> {
  public static toDTO(route: Route): IRouteDTO {
    return {
      routeId: route.routeId.routeId,
      distance: route.distance.distance,
      routeTime: route.routeTime.routeTime,
      batteryWaste: route.batteryWaste.batteryWaste,
      arrivalId: route.arrivalId,
      departureId: route.departureId,
      extraTime: route.extraTime.extraTime,
    } as IRouteDTO;
  }

  public static toDomain(raw: any | Model<IRoutePersistence & Document>): Route {
    const routeOrError = Route.create(raw, new UniqueEntityID(raw.domainId));

    routeOrError.isFailure ? console.log(routeOrError.error) : '';

    return routeOrError.isSuccess ? routeOrError.getValue() : null;
  }

  public static toPersistence(route: Route): any {
    const a = {
      routeId: route.routeId.routeId,
      distance: route.distance.distance,
      routeTime: route.routeTime.routeTime,
      batteryWaste: route.batteryWaste.batteryWaste,
      arrivalId: route.arrivalId,
      departureId: route.departureId,
      extraTime: route.extraTime.extraTime,
    };
    return a;
  }
}
