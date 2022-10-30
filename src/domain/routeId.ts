//import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { ValueObject } from "../core/domain/ValueObject";

interface RouteProps {
    routeId: string;
  }

export class RouteId extends ValueObject<RouteProps> {
get routeId(): string {
    return this.props.routeId;
}

private constructor(props: RouteProps) {
    super(props);
}
    
}