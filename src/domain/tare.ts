import { ValueObject } from "../core/domain/ValueObject";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface TareProps {
    value: number;
  }
  
  export class Tare extends ValueObject<TareProps> {
    get value (): number {
      return this.props.value;
    }
    
    private constructor (props: TareProps) {
      super(props);
    }
  
     public static create (tare: number): Result<Tare> {
      const guardResult = Guard.againstNullOrUndefined(tare, 'tare');
      if (!guardResult.succeeded) {
        return Result.fail<Tare>(guardResult.message);
      } else {
        return Result.ok<Tare>(new Tare({ value: tare }))
      }
    } 
      

  }