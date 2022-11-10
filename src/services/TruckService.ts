import { Service,Container, Inject, Token} from 'typedi';
import config from "../../config";
import ITruckDTO from '../dto/ITruckDTO';
import { Truck } from "../domain/truck/truck";
import ITruckRepo from './IRepos/ITruckRepo';
import ITruckService from './IServices/ITruckService';
import { Result } from "../core/logic/Result";
import { TruckMap } from "../mappers/TruckMap";
import {LicencePlate} from "../domain/truck/licencePlate";
import {Tare} from "../domain/truck/tare";
import {Capacity} from "../domain/truck/capacity";
import {MaxBateryCapacity} from "../domain/truck/maxBateryCapacity";
import {AutonomyFullChargeLoad} from "../domain/truck/autonomyFullChargeLoad";
import {TimeCharging} from "../domain/truck/timeCharging";


@Service()
export default class TruckService implements ITruckService {
  constructor(
      @Inject(config.repos.truck.name) private truckRepo : ITruckRepo
  ) {  }

  

  public async getTrucks(): Promise<Result<ITruckDTO[]>> {
    try {

      let truck = await this.truckRepo.getAllTrucks();

      if (truck == null) {
        return Result.fail('trucks not found');
      }

      const truckDTORes = truck.map(item => TruckMap.toDTO(item));

      return Result.ok<ITruckDTO[]>(truckDTORes);
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


  public async createTruck( truckDTO: ITruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findLicencePlate(truckDTO.licencePlate);

      if (truck != null) {
  
        return Result.fail< ITruckDTO>("Truck already exists: " +truckDTO.licencePlate);
      }
      const truckOrError = await Truck.create(truckDTO);
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
        truck.props.licencePlate=LicencePlate.create(truckDTO.licencePlate).getValue();

        truck.tare = Tare.create(truckDTO.tare).getValue();
        truck.capacity = Capacity.create(truckDTO.capacity).getValue();
        truck.maxBateryCapacity = MaxBateryCapacity.create(truckDTO.maxBateryCapacity).getValue();
        truck.autonomyFullChargeLoad= AutonomyFullChargeLoad.create(truckDTO.autonomyFullChargeLoad).getValue();
        truck.timeCharging= TimeCharging.create(truckDTO.timeCharging).getValue();
        await this.truckRepo.save(truck);

        const truckDTOResult = TruckMap.toDTO( truck ) as ITruckDTO;
        return Result.ok<ITruckDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  

}}
