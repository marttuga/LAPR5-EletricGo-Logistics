import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';



interface CapacityProps {
  value: number;
}

export class Capacity extends ValueObject<CapacityProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: CapacityProps) {
    super(props);
  }  
  public static create (capacity: number): Result<Capacity> {
    const guardResult = Guard.againstNullOrUndefined(capacity, 'capacity');
    if (!guardResult.succeeded) {
      return Result.fail<Capacity>(guardResult.message);
    } else {
      return Result.ok<Capacity>(new Capacity({ value: capacity }))
    }
  }

}