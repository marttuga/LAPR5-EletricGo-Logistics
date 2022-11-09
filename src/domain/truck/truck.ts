import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";
import { LicencePlate} from "./licencePlate";

import ITruckDTO from "../../dto/ITruckDTO";
import { Tare } from "./tare";
import { MaxBateryCapacity } from "./maxBateryCapacity";
import { AutonomyFullChargeLoad } from "./autonomyFullChargeLoad";
import { TimeCharging } from "./timeCharging";
import { Capacity } from "./capacity";
import { identity } from "lodash";
import { urlToHttpOptions } from "url";

interface TruckProps {
  licencePlate: LicencePlate;
  tare: Tare;
  capacity:Capacity;
  maxBateryCapacity:MaxBateryCapacity;
  autonomyFullChargeLoad:AutonomyFullChargeLoad;
  timeCharging: TimeCharging;
}

export class Truck extends AggregateRoot<TruckProps> {

  get id (): UniqueEntityID {
    return this._id;

  }
  
  get licencePlate (): LicencePlate {
    return this.props.licencePlate;
  }

  get tare (): Tare {
    return this.props.tare;
  }

  set tare ( value: Tare) {
    this.props.tare = value;
  }

  get capacity (): Capacity {
    return this.props.capacity;
  }
  set capacity ( value: Capacity) {
    this.props.capacity = value;
  }

  get maxBateryCapacity (): MaxBateryCapacity {
    return this.props.maxBateryCapacity;
  }
  set maxBateryCapacity ( value: MaxBateryCapacity) {
    this.props.maxBateryCapacity = value;
  }

  get autonomyFullChargeLoad (): AutonomyFullChargeLoad {
    return this.props.autonomyFullChargeLoad;
  }
  set autonomyFullChargeLoad ( value: AutonomyFullChargeLoad) {
    this.props.autonomyFullChargeLoad = value;
  }

  set licencePlate ( value: LicencePlate) {
    this.props.licencePlate = value;
  }

  get timeCharging (): TimeCharging {
    return this.props.timeCharging;
  }
  set timeCharging ( value: TimeCharging) {
  this.props.timeCharging = value;
  }

  private constructor (props: TruckProps, id?: UniqueEntityID) {
    super(props, id);
  }


  public static create(TruckDTO: ITruckDTO, id?: UniqueEntityID): Result<Truck>  {
    let licencePlate; let tare; let capacity; let maxBateryCapacity; let autonomyFullChargeLoad; let timeCharging;
    try {
     licencePlate= LicencePlate.create(TruckDTO.licencePlate).getValue();
     tare = Tare.create(TruckDTO.tare).getValue();
     capacity = Capacity.create(TruckDTO.capacity).getValue();
     maxBateryCapacity = MaxBateryCapacity.create(TruckDTO.maxBateryCapacity).getValue();
     autonomyFullChargeLoad = AutonomyFullChargeLoad.create(TruckDTO.autonomyFullChargeLoad).getValue();
     timeCharging = TimeCharging.create(TruckDTO.timeCharging).getValue();
   
     
    if (licencePlate === undefined || tare === undefined || capacity === undefined || maxBateryCapacity === undefined || autonomyFullChargeLoad === undefined || timeCharging === undefined) {
      return Result.fail<Truck>('Error creating truck!');
      
    } else {        
      const truck = new Truck({ licencePlate:licencePlate, tare: tare, capacity: capacity, maxBateryCapacity: maxBateryCapacity, autonomyFullChargeLoad: autonomyFullChargeLoad, timeCharging:timeCharging}, id);
    
      return Result.ok<Truck>(truck);
    }
    }catch (error){
      return Result.fail<Truck>('Error creating truck!');
    }
  }

}

