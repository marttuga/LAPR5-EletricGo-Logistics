import { Service, Inject } from 'typedi';
import config from "../../config";
import ITruckDTO from '../dto/ITruckDTO';
import { Truck } from "../domain/Truck";
import ITruckRepo from './IRepos/ITruckRepo';
import ITruckService from './IServices/ITruckService';
import { Result } from "../core/logic/Result";
import { TruckMap } from "../mappers/TruckMap";

@Service()
export default class TruckService implements ITruckService {
  constructor(
      @Inject(config.repos.truck.name) private truckRepo : ITruckRepo
  ) {
    this.truckRepo=truckRepo;
  }

  public async getTrucks(): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.getAll();

     

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else { 

        let truckDTOResult;
        for (let i = 0; i < truck.length; i++) {
         truckDTOResult = TruckMap.toDTO(truck[i]) as ITruckDTO;
          
        }
        
        return Result.ok<ITruckDTO>( truckDTOResult ); 
        }
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getTruckId( truckId: string): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByTruckId(truckId);

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

      const truckOrError = await Truck.create( truckDTO );

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
      const truck = await this.truckRepo.findByTruckId(truckDTO.licencePlate);

      if (truck === null) {
        return Result.fail<ITruckDTO>("Truck not found");
      }
      else {
        truck.licencePlate = truckDTO.licencePlate;
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
