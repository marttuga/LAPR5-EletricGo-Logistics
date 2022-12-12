import { Service, Inject } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import { FleetPlaning } from "../domain/fleetPlan/fleetPlaning";
import IFleetPlaningDTO from "../dto/IFleetPlaningDTO";
import { FleetPlaningMap } from "../mappers/FleetPlaningMap";
import IFleetPlaningService from "./IServices/IFleetPlaningService";
import IFleetPlaningRepo from "./IRepos/IFleetPlaningRepo";

@Service()
export default class FleetPlaningService implements IFleetPlaningService {
  constructor(@Inject(config.repos.fleetPlaning.name) private planeamentoRepo : IFleetPlaningRepo) {}

  public async getBestRoute(data: string,camiao:string): Promise<Result<any[]>> {
    try {

      const melhorViagem = await this.planeamentoRepo.getBestRoute(data, camiao
      );

      return Result.ok<any[]>(melhorViagem);
    } catch (e) {
      throw e;
    }
  }

  public async getNearestWarehouse(
    data: string
  ): Promise<Result<any[]>> {
    try {
      const camiao = "eTruck01";

      const melhorViagem: any[] = await this.planeamentoRepo.getNearestWarehouse(
        data,
        camiao
      );

      return Result.ok<any[]>(melhorViagem);
    } catch (e) {
      throw e;
    }
  }

  public async getRouteGreaterMass(
    data: string
  ): Promise<Result<any[]>> {
    try {
      const camiao = "eTruck01";

      const melhorViagem: any[] = await this.planeamentoRepo.getRouteGreaterMass(
        data,
        camiao
      );

      return Result.ok<any[]>(melhorViagem);
    } catch (e) {
      throw e;
    }
  }

  public async getRouteBestRelation(
    data: string
  ): Promise<Result<any[]>> {
    try {
      const camiao = "eTruck01";

      const melhorViagem: any[] = await this.planeamentoRepo.getRouteBestRelation(
        data,
        camiao
      );

      return Result.ok<any[]>(melhorViagem);
    } catch (e) {
      throw e;
    }
  }

  public async createPlaning( fleetPlaningDTO: IFleetPlaningDTO): Promise<Result<IFleetPlaningDTO>> {
   
      const truckOrError = await FleetPlaning.create(fleetPlaningDTO);
      if (truckOrError.isFailure) {
        return Result.fail<IFleetPlaningDTO>(truckOrError.errorValue());
      }

      const result = truckOrError.getValue();

      await this.planeamentoRepo.save(result);
      const dTOResult = FleetPlaningMap.toDTO( result ) as IFleetPlaningDTO;

      return Result.ok<IFleetPlaningDTO>( dTOResult )
    } catch (e) {
      throw e;
    }
    
  
}