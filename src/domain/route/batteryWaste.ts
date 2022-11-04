import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface RouteProps {
  batteryWaste: string;
}

export class BatteryWaste extends ValueObject<RouteProps> {
  get batteryWaste(): string {
    return this.props.batteryWaste;
  }

  private constructor(props: RouteProps) {
    super(props);
  }

  public static create(props: RouteProps): Result<BatteryWaste> {
    const guardResult = Guard.againstNullOrUndefined(props, 'batteryWaste');

    if (!guardResult.succeeded) {
      return Result.fail<BatteryWaste>(guardResult.message);
    } else {
      return Result.ok<BatteryWaste>(new BatteryWaste({ batteryWaste: props.batteryWaste }));
    }
  }
}
