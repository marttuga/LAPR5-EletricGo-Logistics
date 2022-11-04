import { BatteryWaste } from "../domain/batteryWaste";
import { Distance } from "../domain/distance";
import { ExtraTime } from "../domain/extraTime";
import { RouteId } from "../domain/routeId";
import { RouteTime } from "../domain/routeTime";

export default interface IRouteDTO {
    routeId: string;
    distance: string,
    routeTime: string,
    batteryWaste: string,
    arrivalId: string,
    departureId: string,
    extraTime: string,
  }
  