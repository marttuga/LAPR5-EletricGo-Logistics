import { Service, Inject } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import { FleetPlaning } from "../domain/fleetPlan/fleetPlaning";
import IFleetPlaningDTO from "../dto/IFleetPlaningDTO";
import { FleetPlaningMap } from "../mappers/FleetPlaningMap";
import IFleetPlaningService from "./IServices/IFleetPlaningService";
import IFleetPlaningRepo from "./IRepos/IFleetPlaningRepo";
import { Console } from "console";

@Service()
export default class FleetPlaningService implements IFleetPlaningService {
  constructor(@Inject(config.repos.fleetPlaning.name) private planeamentoRepo : IFleetPlaningRepo) {}

  public async getBestRoute(data: string,camiao:string): Promise<Result<{viagem : string[]}>> {

    try {
     
      const melhorViagem = await this.planeamentoRepo.getBestRoute(data, camiao);

      return Result.ok<{viagem : string[]}>(melhorViagem);
    } catch (e) {
      throw e;
    }
  }

  public async getNearestWarehouse(data: string,camiao:string): Promise<Result<{viagem : string[]}>> {
    try {

      const melhorViagem = await this.planeamentoRepo.getNearestWarehouse(data, camiao);

      return Result.ok<{viagem : string[]}>(melhorViagem);
    } catch (e) {
      throw e;
    }
  }

  public async getRouteGreaterMass(data: string,camiao:string): Promise<Result<{viagem : string[]}>>  {
    try {

      const melhorViagem = await this.planeamentoRepo.getRouteGreaterMass(data, camiao);

      return Result.ok<{viagem : string[]}>(melhorViagem);
    } catch (e) {
      throw e;
    }
  }

  public async getRouteBestRelation(data: string,camiao:string):Promise<Result<{viagem : string[]}>>  {
    try {

      const melhorViagem = await this.planeamentoRepo.getRouteBestRelation(data, camiao);

      return Result.ok<{viagem : string[]}>(melhorViagem);
    } catch (e) {
      throw e;
    }
  }

  public async createPlaning( fleetPlaningDTO: IFleetPlaningDTO): Promise<Result<IFleetPlaningDTO>> {
   
    try {
      const fleetPlan = await this.planeamentoRepo.findFleetPlaningId(fleetPlaningDTO.fleetPlaningId);

      if (fleetPlan != null) {
  
        return Result.fail< IFleetPlaningDTO>("fleetPlan already exists: " +fleetPlaningDTO.fleetPlaningId);
      }

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


  
  public async getPlanings(): Promise<Result<IFleetPlaningDTO[]>> {
    try {

      let truck = await this.planeamentoRepo.getAllFleetPlanings();

      if (truck == null) {
        return Result.fail('planings not found');
      }

      const truckDTORes = truck.map(item => FleetPlaningMap.toDTO(item));

      return Result.ok<IFleetPlaningDTO[]>(truckDTORes);
    } catch (e) {
      throw new Error(e);
    }
  }
}