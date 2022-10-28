import { Service, Inject } from 'typedi';
import config from "../../config";
import IRouteDTO from '../dto/IRouteDTO';
import { Route } from "../domain/route";
import IRouteRepo from '../services/IRepos/IRouteRepo';
import IRouteService from './IServices/IRouteService';
import { Result } from "../core/logic/Result";
import { RouteMap } from "../mappers/RouteMap";

@Service()
export default class RouteService implements IRouteService {
  constructor(
      @Inject(config.repos.route.name) private routeRepo : IRouteRepo
  ) {}

  public async getRouteId( routeId: number): Promise<Result<IRouteDTO>> {
    try {
      const route = await this.routeRepo.findByRouteId(routeId);

      if (route === null) {
        return Result.fail<IRouteDTO>("Route not found");
      }
      else {
        const routeDTOResult = RouteMap.toDTO( route ) as IRouteDTO;
        return Result.ok<IRouteDTO>( routeDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createRoute(routeDTO: IRouteDTO): Promise<Result<IRouteDTO>> {
    try {

      const routeOrError = await Route.create( routeDTO );

      if (routeOrError.isFailure) {
        return Result.fail<IRouteDTO>(routeOrError.errorValue());
      }

      const routeResult = routeOrError.getValue();

      await this.routeRepo.save(routeResult);

      const routeDTOResult = RouteMap.toDTO( routeResult ) as IRouteDTO;
      return Result.ok<IRouteDTO>( routeDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateRoute(routeDTO: IRouteDTO): Promise<Result<IRouteDTO>> {
    try {
      const route = await this.routeRepo.findByRouteId(routeDTO.routeId);

      if (route === null) {
        return Result.fail<IRouteDTO>("Route not found");
      }
      else {
        route.distance = routeDTO.distance;
        await this.routeRepo.save(route);

        const routeDTOResult = RouteMap.toDTO( route ) as IRouteDTO;
        return Result.ok<IRouteDTO>( routeDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

}
