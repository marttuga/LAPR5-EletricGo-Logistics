import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import IRouteDTO from "../dto/IRouteDTO";

import { Route } from "../domain/route";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";


export class RouteMap extends Mapper<Route> {

  public static toDTO( Route: Route): IRouteDTO {
    return {
      //id: Route.id.toString(),
      distance: Route.distance
    } as IRouteDTO;
  }

  public static async toDomain (raw: any): Promise<Route> {
    //const routeIdOrError = routeId.create(raw.routeId);

    const RouteOrError = Route.create({
     // routeId:routeIdOrError.getValue(),
     distance: raw.distance,
    }, new UniqueEntityID(raw.domainId))

    RouteOrError.isFailure ? console.log(RouteOrError.error) : '';
    
    return RouteOrError.isSuccess ? RouteOrError.getValue() : null;
  }

  public static toPersistence (Route: Route): any {
    const a = {
      domainId: Route.id.toString(),
      distance: Route.distance
    }
    return a;
  }
}