import { BatteryWaste } from '../domain/route/batteryWaste';
import { Distance } from '../domain/route/distance';
import { ExtraTime } from '../domain/route/extraTime';
import { RouteId } from '../domain/route/routeId';
import { RouteTime } from '../domain/route/routeTime';

export default interface IRouteDTO {
  routeId: string;
  distance: string;
  routeTime: string;
  batteryWaste: string;
  arrivalId: string;
  departureId: string;
  extraTime: string;
}
