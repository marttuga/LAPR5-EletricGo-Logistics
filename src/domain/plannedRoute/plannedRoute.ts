import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

import { Result } from '../../core/logic/Result';
import IPlannedRouteDTO from '../../dto/IPlannedRouteDTO';
import { LicencePlate } from '../truck/licencePlate';

interface PlannedRouteProps {
    truckId: LicencePlate;
    arrivalId:string;
    departureId:string;
    date:string;
    totalTime: number;
}

export class PlannedRoute extends AggregateRoot<PlannedRouteProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get truckId(): LicencePlate {
    return this.props.truckId;
  }
  set truckId(truckId: LicencePlate) {
    this.props.truckId = this.truckId;
  }

  get arrivalId(): string {
    return this.props.arrivalId;
  }
  set arrivalId(arrivalId: string) {
    this.props.arrivalId = arrivalId;
  }

  get departureId(): string {
    return this.props.departureId;
  }
  set departureId(arrivalId: string) {
    this.props.departureId = this.departureId;
  }

  get date(): string {
    return this.props.date;
  }
  set date(date: string) {
    this.props.date = date;
  }

  private constructor(props: PlannedRouteProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(PlannedRouteDTO: IPlannedRouteDTO, id?: UniqueEntityID): Result<PlannedRoute> {
    const truckId = PlannedRouteDTO.truckId;
    const arrivalId = PlannedRouteDTO.arrivalId;
    const departureId = PlannedRouteDTO.departureId;
    const date = PlannedRouteDTO.date;
    const totalTime = PlannedRouteDTO.totalTime;

    if (
      truckId === undefined ||
      arrivalId === undefined ||
      departureId === undefined ||
      date === undefined ||
      totalTime === undefined
    ) {
      return Result.fail<PlannedRoute>('Planned Route Error!');
    } else {
      const plannedRoute = new PlannedRoute(
        {
          truckId: LicencePlate.create(truckId).getValue(),
          arrivalId: arrivalId,
          departureId: departureId,
          date : date,
          totalTime: totalTime,
        },
        id,
      );
      return Result.ok<PlannedRoute>(plannedRoute);
    }
  }
}
