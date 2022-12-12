import { Service, Inject } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import { FleetPlaning } from "../domain/fleetPlan/fleetPlaning";
import IFleetPlaningDTO from "../dto/IFleetPlaningDTO";
import { FleetPlaningMap } from "../mappers/FleetPlaningMap";
import IFleetPlaningService from "./IServices/IFleetPlaningService";

@Service()
export default class FleetPlaningService implements IFleetPlaningService {
  constructor(@Inject(config.repos.fleetPlaning.name) private planeamentoRepo) {}

  public async getBestRoute(data: string): Promise<Result<any[]>> {
    try {
      const camiao = "eTruck01";

      const melhorViagem: any[] = await this.planeamentoRepo.melhorViagem(
        data,
        camiao
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

      const melhorViagem: any[] = await this.planeamentoRepo.menorDistancia(
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

      const melhorViagem: any[] = await this.planeamentoRepo.maiorMassa(
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

      const melhorViagem: any[] = await this.planeamentoRepo.melhorRelacao(
        data,
        camiao
      );

      return Result.ok<any[]>(melhorViagem);
    } catch (e) {
      throw e;
    }
  }

  public async createPlanning( fleetPlaningDTO: IFleetPlaningDTO): Promise<Result<IFleetPlaningDTO>> {
   
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