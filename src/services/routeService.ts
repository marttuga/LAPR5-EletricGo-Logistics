import { Service, Inject } from 'typedi';
import config from '../../config';
import IRouteDTO from '../dto/IRouteDTO';
import { Route } from '../domain/route/route';
import IRouteRepo from '../services/IRepos/IRouteRepo';
import IRouteService from './IServices/IRouteService';
import { Result } from '../core/logic/Result';
import { RouteMap } from '../mappers/RouteMap';
import { RouteId } from '../domain/route/routeId';

@Service()
export default class RouteService implements IRouteService {
  constructor(@Inject(config.repos.route.name) private routeRepo: IRouteRepo) {}

  public async getRouteId(routeId: string): Promise<Result<IRouteDTO>> {
    try {
      const route = await this.routeRepo.findByRouteId(routeId);

      if (route === null) {
        return Result.fail<IRouteDTO>('Route not found');
      } else {
        const routeDTOResult = RouteMap.toDTO(route) as IRouteDTO;
        return Result.ok<IRouteDTO>(routeDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getRoutes(): Promise<Result<IRouteDTO[]>> {
    try {
      let route = await this.routeRepo.getAll();

      if (route == null) {
        return Result.fail('Route not found');
      }

      const routeDTORes = route.map(item => RouteMap.toDTO(item));

      return Result.ok<IRouteDTO[]>(routeDTORes);
    } catch (e) {
      throw new Error(e);
    }
  }

  public async createRoute(routeId: string, routeDTO: IRouteDTO): Promise<Result<IRouteDTO>> {
    try {
      const routeOrError = await Route.create(routeDTO);
      if (routeOrError.isFailure) {
        return Result.fail<IRouteDTO>(routeOrError.errorValue());
      }

      const routeResult = routeOrError.getValue();
      await this.routeRepo.save(routeResult);

      const routeDTOResult = RouteMap.toDTO(routeResult) as IRouteDTO;
      return Result.ok<IRouteDTO>(routeDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateRoute(routeId: string, routeDTO: IRouteDTO): Promise<Result<IRouteDTO>> {
    try {
      const route = await this.routeRepo.findByRouteId(routeDTO.routeId);
      if (route === null) {
        return Result.fail<IRouteDTO>('Route not found');
      } else {
        route.routeId.props.routeId = routeDTO.routeId;
        route.distance.props.distance = routeDTO.distance;
        route.routeTime.props.routeTime = routeDTO.routeTime;
        route.batteryWaste.props.batteryWaste = routeDTO.batteryWaste;
        route.arrivalId = routeDTO.arrivalId;
        route.departureId = routeDTO.departureId;
        route.extraTime.props.extraTime = routeDTO.extraTime;
        await this.routeRepo.save(route);

        const routeDTOResult = RouteMap.toDTO(route) as IRouteDTO;
        return Result.ok<IRouteDTO>(routeDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
}
