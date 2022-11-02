import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TruckId} from "./truckId";

import ITruckDTO from "../dto/ITruckDTO";

interface TruckProps {
  licencePlate: string;
  tare: number;
  capacity:number;
  maxBateryCapacity:number;
  autonomyFullChargeLoad:number;
  timeCharging: number;
}



export class Truck extends AggregateRoot<TruckProps> {

  get id (): UniqueEntityID {
    return this._id;

  }
  
  get truckId (): TruckId {
    return TruckId.caller(this.id)
  }
  get licencePlate (): string {
    return this.props.licencePlate;
  }
  set licencePlate ( value: string) {
    this.props.licencePlate = value;
  }


  get tare (): number {
    return this.props.tare;
  }
  set tare ( value: number) {
    this.props.tare = value;
  }

  get capacity (): number {
    return this.props.capacity;
  }
  set capacity ( value: number) {
    this.props.capacity = value;
  }

  get maxBateryCapacity (): number {
    return this.props.maxBateryCapacity;
  }
  set maxBateryCapacity ( value: number) {
    this.props.maxBateryCapacity = value;
  }

  get autonomyFullChargeLoad (): number {
    return this.props.autonomyFullChargeLoad;
  }
  set autonomyFullChargeLoad ( value: number) {
    this.props.autonomyFullChargeLoad = value;
  }

  get timeCharging (): number {
    return this.props.timeCharging;
  }
  set timeCharging ( value: number) {
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

    if ( licencePlate.length===0|| tare=== 0|| capacity=== 0|| maxBateryCapacity=== 0|| autonomyFullChargeLoad=== 0 || timeCharging ===0) {
      return Result.fail<Truck>('Truck must have a tare, load capacity, battery capacity, autonomy and time of charging non null')
    } else {

      const truck = new Truck({ licencePlate:licencePlate, tare: tare, capacity: capacity, maxBateryCapacity:maxBateryCapacity,autonomyFullChargeLoad:autonomyFullChargeLoad,timeCharging:timeCharging}, id);
      return Result.ok<Truck>( truck )
    }
  }
}
