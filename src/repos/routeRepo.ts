import { Service, Inject } from 'typedi';

import IRouteRepo from '../services/IRepos/IRouteRepo';
import { Route } from '../domain/route/route';
import { RouteId } from '../domain/route/routeId';
import { RouteMap } from '../mappers/RouteMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IRoutePersistence } from '../dataschema/IRoutePersistence';

@Service()
export default class RouteRepo implements IRouteRepo {
  private models: any;

  constructor(@Inject('routeSchema') private routeSchema: Model<IRoutePersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async getAll(): Promise<Route[]> {
    const route = await this.routeSchema.find();

    return route.map(item => RouteMap.toDomain(item));
  }

  // @ts-ignore
  public async exists(routeId: RouteId | string): Promise<boolean> {
    const idX = routeId instanceof RouteId ? (<RouteId>routeId).routeId : routeId;

    const query = { domainId: idX };
    const routeDocument = await this.routeSchema.findOne(query);

    return !!routeDocument === true;
  }

  public async save(route: Route): Promise<Route> {
    const query = { routeId: route.routeId.routeId };
    const routeDocument = await this.routeSchema.findOne(query);
    try {
      if (routeDocument === null) {
        const rawRoute: any = RouteMap.toPersistence(route);

        const routeCreated = await this.routeSchema.create(rawRoute);

        return RouteMap.toDomain(routeCreated);
      } else {
        routeDocument.routeId = route.routeId.routeId;
        routeDocument.distance = route.distance.distance;
        routeDocument.routeTime = route.routeTime.routeTime;
        routeDocument.batteryWaste = route.batteryWaste.batteryWaste;
        routeDocument.arrivalId = route.arrivalId;
        routeDocument.departureId = route.departureId;
        routeDocument.extraTime = route.extraTime.extraTime;
        await routeDocument.save();

        return route;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByRouteId(routeId: RouteId | string): Promise<Route> {
    const query = { routeId: routeId };
    const routeRecord = await this.routeSchema.findOne(query as FilterQuery<IRoutePersistence & Document>);

    if (routeRecord != null) {
      return RouteMap.toDomain(routeRecord);
    } else return null;
  }
}
