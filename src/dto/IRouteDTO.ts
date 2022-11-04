import { BatteryWaste } from "../domain/batteryWaste";
import { Distance } from "../domain/distance";
import { ExtraTime } from "../domain/extraTime";
import { RouteId } from "../domain/routeId";
import { RouteTime } from "../domain/routeTime";

export default interface IRouteDTO {
    routeId: RouteId;
    distance: Distance,
    routeTime: RouteTime,
    batteryWaste: BatteryWaste,
    arrivalId: string,
    departureId: string,
    extraTime: ExtraTime,
  }
  