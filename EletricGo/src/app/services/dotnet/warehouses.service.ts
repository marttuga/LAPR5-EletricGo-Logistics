import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WarehousesService {
  private Url = 'https://localhost:5001/api/warehouse/createWarehouse';

  constructor(private httpClient: HttpClient) { }

  createWarehouse(warehouseIdentifier:string,designation:string,latitude:number,longitude:number,street:string,doorNumber:number,city:string,zipcode:string,altitude:string): Observable<any> {
    const body={
        "WarehouseIdentifier": warehouseIdentifier,
        "Designation": designation,
        "Latitude":latitude,
        "Longitude":longitude,
        "Street":street,
        "DoorNumber": doorNumber,
        "City":city,
        "zipCode":zipcode,
        "WarehouseAltitude": altitude
    }
    ;
    return this.httpClient.post(this.Url ,body).pipe(map(this.extractData));
  }
  getWarehouses(): Observable<any> {
    return this.httpClient.get(this.Url + 'getAll').pipe(
      map(this.extractData));
  }

  public extractData(res: any) {
    return res || { };
  }
}
