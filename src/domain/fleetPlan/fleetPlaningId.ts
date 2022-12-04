import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';


interface FleetPlaningIdProps {
  fleetPlaningId: string;
}

export class FleetPlaningId extends ValueObject<FleetPlaningIdProps> {
get fleetPlaningId(): string {
  return this.props.fleetPlaningId;
}

private constructor(props: FleetPlaningIdProps) {
  super(props);
}

public static create(id: string): Result<FleetPlaningId> {
  const guardResult = Guard.againstNullOrUndefined(id, 'id');

  if (!guardResult.succeeded) {
    return Result.fail<FleetPlaningId>(guardResult.message);
  } else {
    return Result.ok<FleetPlaningId>(new FleetPlaningId({ fleetPlaningId: id }));
  }
}
  
}  
