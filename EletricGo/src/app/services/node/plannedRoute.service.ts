import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlannedRouteService {

  private Url = 'http://localhost:64172/'

  constructor(private httpClient: HttpClient) { }

  getAllRoutesOnDate(date:string){
    return this.httpClient.get(this.Url + 'getAllRoutesOnDate?date='+date).pipe(
      map(this.extractData));
  }

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
    return this.httpClient.get(this.Url + 'getRouteBestRelation?date='+date+"&truck="+truck).pipe(
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
