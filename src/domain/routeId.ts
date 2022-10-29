import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { ValueObject } from "../core/domain/ValueObject";

interface RouteProps {
    rId: string;
  }

export class RouteId extends ValueObject<RouteProps> {
get rId(): string {
    return this.props.rId;
}

//private constructor(props: RouteProps) 
    
}