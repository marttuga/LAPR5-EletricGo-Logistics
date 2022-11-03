import { Service, Inject } from 'typedi';
import config from "../../config";
import ITruckDTO from '../dto/ITruckDTO';
import { Truck } from "../domain/truck";
import ITruckRepo from './IRepos/ITruckRepo';
import ITruckService from './IServices/ITruckService';
import { Result } from "../core/logic/Result";
import { TruckMap } from "../mappers/TruckMap";
import { LicencePlate } from '../domain/licencePlate';
import { Tare } from '../domain/tare';
import { Capacity } from '../domain/capacity';
import { MaxBateryCapacity } from '../domain/maxBateryCapacity';
import { AutonomyFullChargeLoad } from '../domain/autonomyFullChargeLoad';
import { TimeCharging } from '../domain/timeCharging';

@Service()
export default class TruckService implements ITruckService {
  constructor(
      @Inject(config.repos.truck.name) private truckRepo : ITruckRepo
  ) {
    this.truckRepo=truckRepo;
  }

  
  public async getTrucks(): Promise<Result<ITruckDTO[]>> {
    try {
      const truckList = await this.truckRepo.getAllTrucks();

     

      if (truckList === null) {
        return Result.fail<ITruckDTO[]>("There are no trucks");
      }
      else { 

        const truckDTOResult=truckList.map((lista:Truck) => TruckMap.toDTO(lista)as ITruckDTO);
        return Result.ok<ITruckDTO[]>( truckDTOResult ); 
        }
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getLicencePlate( licencePlate: string): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findLicencePlate(licencePlate);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        const truckDTOResult = TruckMap.toDTO( truck ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
        const truckOrError = await Truck.create({licencePlate:LicencePlate.create(truckDTO.licencePlate.licencePlate).getValue(), 

        tare:Tare.create(truckDTO.tare.value).getValue(), 

        capacity:Capacity.create(truckDTO.capacity.value).getValue(),

        maxBateryCapacity:MaxBateryCapacity.create(truckDTO.maxBateryCapacity.value).getValue(),

        autonomyFullChargeLoad:AutonomyFullChargeLoad.create(truckDTO.autonomyFullChargeLoad.value).getValue(),

        timeCharging:TimeCharging.create(truckDTO.timeCharging.value).getValue() });  

      

          //const truckOrError = await Truck.create(truckDTO);

      if (truckOrError.isFailure) {
        return Result.fail<ITruckDTO>(truckOrError.errorValue());
      }

      const truckResult = truckOrError.getValue();

      await this.truckRepo.save(truckResult);

      const truckDTOResult = TruckMap.toDTO( truckResult ) as ITruckDTO;
      return Result.ok<ITruckDTO>( truckDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findLicencePlate(truckDTO.licencePlate);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        truck.tare = truckDTO.tare;
        truck.capacity = truckDTO.capacity;
        truck.maxBateryCapacity = truckDTO.maxBateryCapacity;
        truck.autonomyFullChargeLoad = truckDTO.autonomyFullChargeLoad;
        truck.timeCharging = truckDTO.timeCharging; 
                
        await this.truckRepo.save(truck);

        const truckDTOResult = TruckMap.toDTO( truck ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

}
