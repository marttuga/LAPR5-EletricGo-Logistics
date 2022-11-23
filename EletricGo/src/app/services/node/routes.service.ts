import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private Url = 'http://localhost:3000/api/routes';

  constructor(private httpClient: HttpClient) { }

  // createRoute(routeId:string,distance:string,routeTime:string,batteryWaste:string,arrivalId:string,departureId:string,extraTime:string): Observable<any> {
  //   const body={
  //     "RouteId": {
  //       "RouteId": routeId
  //     },
  //     "Distance": {
  //       "Distance": distance
  //     },
  //     "RouteTime": {
  //       "RouteTime": routeTime
  //     },
  //     "BatteryWaste": {
  //       "BatteryWaste": batteryWaste
  //     },

  //     "ArrivalId": arrivalId,

  //     "DepartureId": departureId,

  //     "ExtraTime": {
  //       "ExtraTime": extraTime
  //     }
  //   }
  //   ;
  //   return this.httpClient.post(this.Url ,body).pipe(map(this.extractData));
  // }

  createRoute(routeId: string,distance:string,routeTime:string,batteryWaste:string,arrivalId: string, departureId: string, extraTime:string) {
    const body={"routeId":routeId, "distance":distance, "routeTime":routeTime, "batteryWaste":batteryWaste, "arrivalId": arrivalId, "departureId":departureId,"extraTime":extraTime};
    console.log(body);
    return this.httpClient.post(this.Url + '/createRoute',body)
      .pipe(map(this.extractData)
      );

  }

  public getRoutes(): Observable<any> {
    return this.httpClient.get(this.Url + '/getRoutes').pipe(
      map(this.extractData));
  }

  getRoute(routeId: string): Observable<any> {
    return this.httpClient.get(this.Url + '/getById/:routeId' +routeId).pipe(
      map(this.extractData));
  }

  public extractData(res: any) {
    return res || { };
  }
}
