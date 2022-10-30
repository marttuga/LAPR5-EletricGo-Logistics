import { Service, Inject } from 'typedi';

import IRouteRepo from "../services/IRepos/IRouteRepo";
import { Route } from "../domain/route";
import { RouteId } from "../domain/routeId";
import { RouteMap } from "../mappers/RouteMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IRoutePersistence } from '../dataschema/IRoutePersistence';

@Service()
export default class RouteRepo implements IRouteRepo {
  private models: any;

  constructor(
    @Inject('routeSchema') private routeSchema : Model<IRoutePersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(routeId: RouteId): Promise<boolean> {
    
    const idX = routeId instanceof RouteId ? (<RouteId>routeId).routeId : routeId;

    const query = { domainId: idX}; 
    const routeDocument = await this.routeSchema.findOne( query as FilterQuery<IRoutePersistence & Document>);

    return !!routeDocument === true;
  }

  public async save (route: Route): Promise<Route> {
    const query = { domainId: route.id.toString()}; 

    const routeDocument = await this.routeSchema.findOne( query );

    try {
      if (routeDocument === null ) {
        const rawRoute: any = RouteMap.toPersistence(route);

        const routeCreated = await this.routeSchema.create(rawRoute);

        return RouteMap.toDomain(routeCreated);
      } else {
        routeDocument.distance = route.distance;
        await routeDocument.save();

        return route;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByRouteId (routeId: RouteId | number): Promise<Route> {
    const query = { domainId: routeId};
    const routeRecord = await this.routeSchema.findOne( query as FilterQuery<IRoutePersistence & Document> );

    if( routeRecord != null) {
      return RouteMap.toDomain(routeRecord);
    }
    else
      return null;
  }
}