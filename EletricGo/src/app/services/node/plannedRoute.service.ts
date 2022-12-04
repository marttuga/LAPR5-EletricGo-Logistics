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
    return this.httpClient.get(this.Url + 'getAllRoutesOnDate?orig='+date).pipe(
      map(this.extractData));
  }

  getBestRoute(date:string,truck:string){
    return this.httpClient.get(this.Url + 'getBestRoute?orig='+date+"&dest="+truck).pipe(
      map(this.extractData));
  }

  getNearestWarehouse(date:string,truck:string){
    return this.httpClient.get(this.Url + 'getNearestWarehouse?orig='+date+"&dest="+truck).pipe(
      map(this.extractData));
  }
  
  getRouteGreaterMass(date:string,truck:string){
    return this.httpClient.get(this.Url + 'getRouteGreaterMass?orig='+date+"&dest="+truck).pipe(
      map(this.extractData));
  }

  getRouteBestRelation(date:string,truck:string){
    return this.httpClient.get(this.Url + 'getRouteBestRelation?orig='+date+"&dest="+truck).pipe(
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
