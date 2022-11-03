import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { LicencePlate} from "./licencePlate";

import ITruckDTO from "../dto/ITruckDTO";
import { Tare } from "./tare";
import { MaxBateryCapacity } from "./maxBateryCapacity";
import { AutonomyFullChargeLoad } from "./autonomyFullChargeLoad";
import { TimeCharging } from "./timeCharging";
import { Capacity } from "./capacity";
import { identity } from "lodash";

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
    return LicencePlate.caller(this.id)
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

  get timeCharging (): TimeCharging {
    return this.props.timeCharging;
  }
  set timeCharging ( value: TimeCharging) {
  this.props.timeCharging = value;
  }

  private constructor (props: TruckProps, id?: UniqueEntityID) {
    super(props, id);
  }



  public static create (TruckDTO: ITruckDTO, id?: UniqueEntityID): Result<Truck> {
    const licencePlate= TruckDTO.licencePlate;
    const tare = TruckDTO.tare;
    const capacity = TruckDTO.capacity;
    const maxBateryCapacity = TruckDTO.maxBateryCapacity;
    const autonomyFullChargeLoad = TruckDTO.autonomyFullChargeLoad;
    const timeCharging = TruckDTO.timeCharging;

    if ( tare.value=== 0|| capacity.value=== 0|| maxBateryCapacity.value=== 0|| autonomyFullChargeLoad.value=== 0 || timeCharging.value===0) {
      return Result.fail<Truck>('Truck must have a tare, load capacity, battery capacity, autonomy and time of charging non null')
    } else {

      

        const truck = new Truck({ licencePlate:licencePlate, tare: tare, capacity: capacity, maxBateryCapacity: maxBateryCapacity, autonomyFullChargeLoad: autonomyFullChargeLoad, timeCharging:timeCharging}, id);
        console.log(truck);
        console.log("\n");
      return Result.ok<Truck>( truck )
    }
  } 

}
