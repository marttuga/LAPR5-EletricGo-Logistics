import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlannedRouteService {

 //Url = 'http://localhost:64172/'
  Url = 'http://localhost:3000/api/fleetPlaning';

  constructor(private httpClient: HttpClient) { }

/*

  getBestRoute(date:string,truck:string){
    return this.httpClient.get(this.Url + 'getBestRoute?date='+date+"&truck="+truck).pipe(
      map(this.extractData));
  }

  getNearestWarehouse(date:string,truck:string){
    return this.httpClient.get(this.Url + 'getNearestWarehouse?date='+date+"&truck="+truck).pipe(
      map(this.extractData));
  }

  getRouteGreaterMass(date:string,truck:string){
    return this.httpClient.get(this.Url + 'getRouteGreaterMass?date='+date+"&truck="+truck).pipe(
      map(this.extractData));
  }

  getRouteBestRelation(date:string,truck:string){
    return this.httpClient.get(this.Url + 'getRouteBestRelation?date='+date+"&dest="+truck).pipe(
      map(this.extractData));
  } */



  getBestRoute(date:string,truckId:string){
    return this.httpClient.get(this.Url + '/gera/'+ date +'/'+truckId)
      .pipe(map(this.extractData)
      );

  }

  getNearestWarehouse(date:string,truckId:string){
    return this.httpClient.get(this.Url + '/getNearestWarehouse/'+ date +'/'+truckId)
      .pipe(map(this.extractData)
      );


  }


  getRouteGreaterMass(date:string,truckId:string){

    return this.httpClient.get(this.Url + '/getRouteGreaterMass/'+ date +'/'+truckId)
      .pipe(map(this.extractData)
      );

  }


  getRouteBestRelation(date:string,truckId:string){

    return this.httpClient.get(this.Url + '/getRouteBestRelation/'+ date +'/'+truckId)
      .pipe(map(this.extractData)
      );

  }

  createPlaning(fleetPlaningId: string,truckId:string,date:string,route:string[]) {
    const body={"fleetPlaningId":fleetPlaningId, "truckId":truckId, "date":date, "route":route};
    console.log(body);
    return this.httpClient.post(this.Url + '/createPlaning',body)
      .pipe(map(this.extractData)
      );

  }

  getPlanings(): Observable<any> {
    return this.httpClient.get<any>(this.Url + '/getAll').pipe(
      map(this.extractData));
  }




  importTrucks(){
    return this.httpClient.get(this.Url + 'importTrucks');
  }
  importWarehouses(){
    return this.httpClient.get(this.Url + 'importWarehouses');
  }
  importRoutes(){
    return this.httpClient.get(this.Url + 'importRoutes').pipe(
      map(this.extractData))
  }
  importDeliveries(){
    return this.httpClient.get(this.Url + 'importDeliveries');
  }
  importTrucksData(){
    return this.httpClient.get(this.Url + 'importTrucksData').pipe(
      map(this.extractData))
  }


  private extractData(res: any) {
    return res || { };
  }
}
