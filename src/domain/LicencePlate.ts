import { ValueObject } from "../core/domain/ValueObject";

   
    interface TruckProps {
        licencePlate: string;
      }
    
    export class LicencePlate extends ValueObject<TruckProps> {
    get licencePlate(): string {
        return this.props.licencePlate;
    }
    
    private constructor(props: TruckProps) {
        super(props);
    }
    
}